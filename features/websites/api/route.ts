import {
    and,
    count,
    countDistinct,
    desc,
    eq,
    gte,
    inArray,
    sql
} from "drizzle-orm";
import { z } from "zod";
import { Hono } from "hono";
import { subDays } from "date-fns";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/drizzle/db";
import { sqlDate } from "../constants";
import { addSiteSchema } from "../schemas";
import { WebsiteTable } from "@/drizzle/schema/websites";
import { PageViewTable } from "@/drizzle/schema/page-views";
import { hasInstalledScript as hasInstalledScriptFn } from "../queries";

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
                const website = await db.query.WebsiteTable.findFirst({
                    where: and(
                        eq(WebsiteTable.userId, userId),
                        eq(WebsiteTable.id, websiteId)
                    )
                });
                if (!website) return c.json({ error: "Website not found" }, 404);

                const [updatedWebsite] = await db.update(WebsiteTable)
                    .set({ domain, timezone })
                    .where(and(
                        eq(WebsiteTable.userId, userId),
                        eq(WebsiteTable.id, websiteId)
                    ))
                    .returning({
                        id: WebsiteTable.id
                    });

                return c.json({ data: updatedWebsite });
            } else {
                const existingWebsiteWithSameDomain = await db
                    .query
                    .WebsiteTable
                    .findFirst({
                        where: and(
                            eq(WebsiteTable.userId, userId),
                            eq(WebsiteTable.domain, domain)
                        )
                    });
                if (existingWebsiteWithSameDomain) {
                    return c.json({
                        error: `Website with domain '${domain}' already exists`
                    }, 400);
                }

                const [newWebsite] = await db.insert(WebsiteTable).values({
                    userId,
                    domain,
                    timezone
                }).returning({
                    id: WebsiteTable.id
                });

                return c.json({ data: newWebsite });
            }
        }
    )
    .get(
        "/:websiteId/verify-script",
        verifyAuth(),
        zValidator("param", z.object({ websiteId: z.string() })),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { websiteId } = c.req.valid("param");

            const website = await db.query.WebsiteTable.findFirst({
                where: and(
                    eq(WebsiteTable.userId, userId),
                    eq(WebsiteTable.id, websiteId)
                )
            });
            if (!website) return c.json({ error: "Website not found" }, 404);

            const hasInstalledScript = await hasInstalledScriptFn(
                website.id,
                website.domain
            );
            if (!hasInstalledScript) return c.json({ error: "Script doesn't exist" }, 404);

            return c.json({ data: { success: "Script installation verified" } });
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
                    visitorsCount: countDistinct(PageViewTable.visitorId)
                })
                .from(WebsiteTable)
                .leftJoin(
                    PageViewTable,
                    eq(PageViewTable.websiteId, WebsiteTable.id)
                )
                .where(and(
                    eq(WebsiteTable.userId, userId),
                    gte(PageViewTable.timestamp, startDate)
                ))
                .groupBy(WebsiteTable.id)
                .orderBy(desc(WebsiteTable.addedAt));

            const websiteIds = websites.map((website) => website.id);

            const [{ visitorsCount }] = await db
                .select({
                    visitorsCount: countDistinct(PageViewTable.visitorId)
                })
                .from(PageViewTable)
                .where(and(
                    inArray(PageViewTable.websiteId, websiteIds),
                    gte(PageViewTable.timestamp, startDate)
                ));

            const allWebsitesChartData = await Promise.all(
                websiteIds.map(async (websiteId) => {
                    const chartData = await db
                        .select({
                            pageViews: count(PageViewTable),
                            date: sql<string>`${sql.raw("series")}`.inlineParams()
                        })
                        .from(
                            sql`GENERATE_SERIES(${startDate}, ${currentDate}, '1 hour'::interval) as series`
                        )
                        .leftJoin(PageViewTable, ({ date }) => and(
                            eq(PageViewTable.websiteId, websiteIds[0]),
                            gte(PageViewTable.timestamp, startDate),
                            eq(sqlDate.extractDate(PageViewTable.timestamp), sqlDate.extractDate(date)),
                            eq(sqlDate.extractHour(PageViewTable.timestamp), sqlDate.extractHour(date))
                        ))
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

            return c.json({ data: { websites: websitesWithChartData, visitorsCount } });
        }
    )
    .get(
        "/:websiteId",
        verifyAuth(),
        zValidator("param", z.object({ websiteId: z.string() })),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { websiteId } = c.req.valid("param");

            const website = await db.query.WebsiteTable.findFirst({
                where: ({ id }, { eq }) => eq(id, websiteId)
            });
            if (!website) return c.json({ error: "Website not found" }, 404);
            if (website.userId !== userId) return c.json({ error: "Unpermitted" }, 403);

            return c.json({ data: { success: true } });
        }
    );

export default app;