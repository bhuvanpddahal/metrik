import {
    and,
    count,
    countDistinct,
    desc,
    eq,
    gte,
    inArray,
    lte,
    SQL,
    sql
} from "drizzle-orm";
import { z } from "zod";
import { Hono } from "hono";
import { subDays } from "date-fns";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import {
    generateJoinClauseForNow,
    generateJoinClauseFromDateDiff,
    generateSqlSeriesFromDateDiff
} from "../utils";
import {
    getAverageSessionTime,
    getBounceRate,
    getChartDataFromVisitors,
    getLiveVisitorsCount,
    getOverviewChartData,
    getPageChartData,
    getReferrerChartData,
    getUserJourneyData,
    getVisitorsCount,
    getWebsiteByDomain,
    getWebsiteById,
    hasInstalledScript as hasInstalledScriptFn
} from "../queries";
import {
    OVERVIEW_CHART_INTERVALS,
    overviewChartIntervalsKeys
} from "../constants";
import { db } from "@/drizzle/db";
import { conditionalRound } from "@/lib/utils";
import { SessionTable } from "@/drizzle/schema/sessions";
import { VisitorTable } from "@/drizzle/schema/visitors";
import { WebsiteTable } from "@/drizzle/schema/websites";
import { PageViewTable } from "@/drizzle/schema/page-views";
import { addSiteSchema, websiteIdSchema } from "../schemas";
import { domainSchema, timezoneSchema } from "@/features/settings/schemas";

const app = new Hono()
    .post(
        "/",
        verifyAuth(),
        zValidator("json", addSiteSchema),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { websiteId, domain, timezone } = c.req.valid("json");

            if (websiteId) {
                const website = await getWebsiteById(websiteId);
                if (!website) return c.json({ error: "Website not found" }, 404);
                if (website.userId !== userId) return c.json({ error: "Permission denied" }, 403);

                const [updatedWebsite] = await db.update(WebsiteTable)
                    .set({ domain, timezone })
                    .where(eq(WebsiteTable.id, websiteId))
                    .returning({ id: WebsiteTable.id });

                return c.json({ data: updatedWebsite });
            } else {
                const existingWebsiteWithSameDomain = await getWebsiteByDomain(domain);
                if (existingWebsiteWithSameDomain) {
                    return c.json({
                        error: `Website with domain '${domain}' already exists`
                    }, 400);
                }

                const [newWebsite] = await db.insert(WebsiteTable)
                    .values({ userId, domain, timezone })
                    .returning({ id: WebsiteTable.id });

                return c.json({ data: newWebsite }, 200);
            }
        }
    )
    .patch(
        "/:websiteId/verify-script",
        verifyAuth(),
        zValidator("param", websiteIdSchema),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { websiteId } = c.req.valid("param");

            const website = await getWebsiteById(websiteId);
            if (!website) return c.json({ error: "Website not found" }, 404);
            if (website.userId !== userId) return c.json({ error: "Permission denied" }, 403);

            const hasInstalledScript = await hasInstalledScriptFn(
                website.id,
                website.domain
            );
            if (!hasInstalledScript) return c.json({ error: "Script doesn't exist" }, 400);

            await db.update(WebsiteTable)
                .set({ verifiedAt: new Date() })
                .where(eq(WebsiteTable.id, websiteId));

            return c.json({ data: { success: "Script installation verified" } }, 200);
        }
    )
    .get(
        "/",
        verifyAuth(),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;

            const currentDate = new Date();
            const startDate = subDays(currentDate, 1);

            const websites = await db
                .select({
                    id: WebsiteTable.id,
                    domain: WebsiteTable.domain,
                    visitorsCount: count(VisitorTable)
                })
                .from(WebsiteTable)
                .leftJoin(VisitorTable, eq(
                    VisitorTable.websiteId,
                    WebsiteTable.id
                ))
                .where(eq(WebsiteTable.userId, userId))
                .groupBy(WebsiteTable.id)
                .orderBy(desc(WebsiteTable.addedAt));

            const websiteIds = websites.map((website) => website.id);

            const [{ visitorsCount }] = await db
                .select({
                    visitorsCount: count(VisitorTable)
                })
                .from(VisitorTable)
                .where(and(
                    inArray(VisitorTable.websiteId, websiteIds),
                    gte(VisitorTable.updatedAt, startDate),
                    lte(VisitorTable.updatedAt, currentDate)
                ));

            const allWebsitesChartData = await Promise.all(
                websiteIds.map(async (websiteId) => {
                    const visitors = db.$with("visitors").as(
                        db
                            .select({ id: VisitorTable.id })
                            .from(VisitorTable)
                            .where(and(
                                eq(VisitorTable.websiteId, websiteId),
                                gte(VisitorTable.updatedAt, startDate),
                                lte(VisitorTable.visitedAt, currentDate)
                            ))
                    );

                    const pageViews = db.$with("page_views").as(
                        db
                            .with(visitors)
                            .select({
                                visitorId: visitors.id,
                                timestamp: PageViewTable.timestamp
                            })
                            .from(SessionTable)
                            .innerJoin(visitors, eq(SessionTable.visitorId, visitors.id))
                            .innerJoin(PageViewTable, and(
                                eq(PageViewTable.sessionId, SessionTable.id),
                                gte(PageViewTable.timestamp, startDate),
                                lte(PageViewTable.timestamp, currentDate)
                            ))
                    );

                    const chartData = await db.with(pageViews)
                        .select({
                            date: sql<string>`${sql.raw("series")}`.inlineParams(),
                            totalVisitors: countDistinct(pageViews.visitorId)
                        })
                        .from(
                            sql`GENERATE_SERIES(${startDate}, ${currentDate}, '1 hour'::interval) as series`
                        )
                        .leftJoin(pageViews, ({ date }) => generateJoinClauseForNow(pageViews.timestamp, date))
                        .groupBy(({ date }) => date)
                        .orderBy(({ date }) => date);


                    return {
                        websiteId,
                        chartData
                    };
                })
            );

            const websitesWithChartData = websites.map((website) => {
                const websiteChartData = allWebsitesChartData.find(
                    (chartData) => chartData.websiteId === website.id
                );
                return { ...website, chartData: websiteChartData?.chartData };
            });

            return c.json({ data: { websites: websitesWithChartData, visitorsCount } }, 200);
        }
    )
    .get(
        "/header",
        verifyAuth(),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;

            const websites = await db
                .select({
                    id: WebsiteTable.id,
                    domain: WebsiteTable.domain
                })
                .from(WebsiteTable)
                .where(eq(WebsiteTable.userId, userId))
                .orderBy(desc(WebsiteTable.addedAt))
                .limit(10);

            return c.json({ data: { websites } }, 200);
        }
    )
    .get(
        "/:domain",
        verifyAuth(),
        zValidator("param", domainSchema),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { domain } = c.req.valid("param");

            const website = await getWebsiteByDomain(domain);
            if (!website) return c.json({ error: "Website not found" }, 404);
            if (website.userId !== userId) return c.json({ error: "Permission denied" }, 403);

            return c.json({ data: { website } }, 200);
        }
    )
    .get(
        "/:domain/data",
        verifyAuth(),
        zValidator("param", domainSchema),
        zValidator("query", z.object({
            interval: z.enum([overviewChartIntervalsKeys[0], ...overviewChartIntervalsKeys.slice(1)])
        })),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { domain } = c.req.valid("param");
            const { interval } = c.req.valid("query");

            const website = await getWebsiteByDomain(domain);
            if (!website) return c.json({ error: "Website not found" }, 404);
            if (website.userId !== userId) return c.json({ error: "Permission denied" }, 403);
            if (!website.verifiedAt) return c.json({
                error: "Website not verified",
                websiteId: website.id,
                timezone: website.timezone
            }, 400);

            const intervalObj = OVERVIEW_CHART_INTERVALS[interval];
            const prevStartDate = intervalObj.prevStartDate;
            let startDate: Date;
            const endDate = intervalObj.endDate;
            let intervalSql: SQL<unknown>;
            let joinClause: (timestamp: any, date: SQL<string>) => SQL<unknown> | undefined;

            if (interval === "allTime") {
                startDate = website.addedAt;
                intervalSql = generateSqlSeriesFromDateDiff(startDate, endDate);
                joinClause = generateJoinClauseFromDateDiff(startDate, endDate);
            } else {
                startDate = intervalObj.startDate!;
                intervalSql = intervalObj.sql!;
                joinClause = intervalObj.joinClause!;
            }

            const args = [website.id, startDate, endDate] as const;
            const prevArgs = [website.id, prevStartDate!, startDate] as const;

            let visitorsCountChangeInPercentage: number | null = null;
            const visitorsCount = await getVisitorsCount(...args);
            if (prevStartDate) {
                const prevIntervalVisitorsCount = await getVisitorsCount(...prevArgs);
                const visitorsCountChange = visitorsCount - prevIntervalVisitorsCount;
                const changeInPercentage = prevIntervalVisitorsCount > 0
                    ? (visitorsCountChange / prevIntervalVisitorsCount) * 100 : null;
                visitorsCountChangeInPercentage = changeInPercentage
                    ? conditionalRound(changeInPercentage) : null;
            }

            let bounceRateChangeInPercentage: number | null = null;
            const bounceRate = await getBounceRate(...args);
            if (prevStartDate) {
                const prevIntervalBounceRate = await getBounceRate(...prevArgs);
                const bounceRateChange = bounceRate - prevIntervalBounceRate;
                const changeInPercentage = prevIntervalBounceRate > 0
                    ? (bounceRateChange / prevIntervalBounceRate) * 100 : null;
                bounceRateChangeInPercentage = changeInPercentage
                    ? conditionalRound(changeInPercentage) : null;
            }

            let averageSessionTimeChangeInPercentage: number | null = null;
            const averageSessionTime = await getAverageSessionTime(...args);
            if (prevStartDate) {
                const prevIntervalAverageSessionTime = await getAverageSessionTime(...prevArgs);
                const averageSessionTimeChange = averageSessionTime - prevIntervalAverageSessionTime;
                const changeInPercentage = prevIntervalAverageSessionTime > 0
                    ? (averageSessionTimeChange / prevIntervalAverageSessionTime) * 100 : null;
                averageSessionTimeChangeInPercentage = changeInPercentage
                    ? conditionalRound(changeInPercentage) : null;
            }

            const liveVisitorsCount = await getLiveVisitorsCount(website.id, endDate);
            const overviewChartData = await getOverviewChartData(...args, intervalSql, joinClause);

            const referrerChartData = await getReferrerChartData(...args);
            const pageChartData = await getPageChartData(...args);

            const getChartDataFromVisitorsPrefilled = getChartDataFromVisitors.bind(null, ...args);
            const countryChartData = await getChartDataFromVisitorsPrefilled("country");
            const regionChartData = await getChartDataFromVisitorsPrefilled("region");
            const cityChartData = await getChartDataFromVisitorsPrefilled("city");
            const deviceChartData = await getChartDataFromVisitorsPrefilled("device");
            const browserChartData = await getChartDataFromVisitorsPrefilled("browser");
            const operatingSystemChartData = await getChartDataFromVisitorsPrefilled("operatingSystem");

            const userJourneyData = await getUserJourneyData(website.id, startDate, endDate);
            const goalChartData = userJourneyData.map((data) => ({
                type: data.type,
                totalVisitors: data.visitors.length
            }));

            return c.json({
                data: {
                    startDate,
                    endDate,
                    visitorsCount,
                    visitorsCountChangeInPercentage,
                    bounceRate,
                    bounceRateChangeInPercentage,
                    averageSessionTime,
                    averageSessionTimeChangeInPercentage,
                    liveVisitorsCount,
                    overviewChartData,
                    referrerChartData,
                    pageChartData,
                    countryChartData,
                    regionChartData,
                    cityChartData,
                    deviceChartData,
                    browserChartData,
                    operatingSystemChartData,
                    userJourneyData,
                    goalChartData
                }
            }, 200);
        }
    )
    .patch(
        "/:websiteId/domain",
        verifyAuth(),
        zValidator("param", websiteIdSchema),
        zValidator("json", domainSchema),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { websiteId } = c.req.valid("param");
            const { domain } = c.req.valid("json");

            const website = await getWebsiteById(websiteId);
            if (!website) return c.json({ error: "Website not found" }, 404);
            if (website.userId !== userId) return c.json({ error: "Permission denied" }, 403);

            await db.update(WebsiteTable)
                .set({ domain })
                .where(eq(WebsiteTable.id, websiteId));

            return c.json({ data: { success: "Website domain updated" } }, 200);
        }
    )
    .patch(
        "/:websiteId/timezone",
        verifyAuth(),
        zValidator("param", websiteIdSchema),
        zValidator("json", timezoneSchema),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { websiteId } = c.req.valid("param");
            const { timezone } = c.req.valid("json");

            const website = await getWebsiteById(websiteId);
            if (!website) return c.json({ error: "Website not found" }, 404);
            if (website.userId !== userId) return c.json({ error: "Permission denied" }, 403);

            await db.update(WebsiteTable)
                .set({ timezone })
                .where(eq(WebsiteTable.id, websiteId));

            return c.json({ data: { success: "Website timezone updated" } }, 200);
        }
    )
    .delete(
        "/:websiteId",
        verifyAuth(),
        zValidator("param", websiteIdSchema),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { websiteId } = c.req.valid("param");

            const website = await getWebsiteById(websiteId);
            if (!website) return c.json({ error: "Website not found" }, 404);
            if (website.userId !== userId) return c.json({ error: "Permission denied" }, 403);

            await db.delete(WebsiteTable)
                .where(eq(WebsiteTable.id, websiteId));

            return c.json({ data: { success: "Website deleted" } }, 204);
        }
    );

export default app;