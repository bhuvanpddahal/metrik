import {
    and,
    count,
    countDistinct,
    desc,
    eq,
    gte,
    lt,
    lte,
    SQL,
    sql,
    sum
} from "drizzle-orm";
import { JSDOM } from "jsdom";
import { subMinutes } from "date-fns";

import {
    EventTable,
    PageViewTable,
    SessionTable,
    VisitorTable
} from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { scriptSrc } from "./constants";
import type { UserJourneyData } from "./types";

export const getWebsiteById = async (websiteId: string) => {
    const website = await db.query.WebsiteTable.findFirst({
        where: ({ id }, { eq }) => eq(id, websiteId)
    });

    return website;
};

export const getWebsiteByDomain = async (websiteDomain: string) => {
    const website = await db.query.WebsiteTable.findFirst({
        where: ({ domain }, { eq }) => eq(domain, websiteDomain)
    });

    return website;
};

export const hasInstalledScript = async (
    websiteId: string,
    domain: string
) => {
    try {
        const response = await fetch(`https://${domain}`);
        const text = await response.text();

        const dom = new JSDOM(text);
        const document = dom.window.document;

        const selector = `script[defer][data-website-id='${websiteId}'][data-domain='${domain}'][src='${scriptSrc}']`;
        const scriptTag = document.head.querySelector(selector);
        if (!scriptTag) return false;

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getVisitorsSubquery = (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    return db.$with("visitors").as(
        db
            .select()
            .from(VisitorTable)
            .where(and(
                eq(VisitorTable.websiteId, websiteId),
                gte(VisitorTable.updatedAt, startDate),
                lte(VisitorTable.visitedAt, endDate)
            ))
    );
};

const getSessionsSubquery = (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    const visitors = getVisitorsSubquery(websiteId, startDate, endDate);

    return db.$with("sessions").as(
        db
            .with(visitors)
            .select({
                id: SessionTable.id,
                duration: SessionTable.duration,
                visitorId: sql<string>`'visitors.id'`.as("visitor_id")
            })
            .from(visitors)
            .innerJoin(SessionTable, and(
                eq(SessionTable.visitorId, visitors.id),
                gte(SessionTable.startTime, startDate),
                lte(SessionTable.startTime, endDate)
            ))
    );
};

const getPageViewsSubquery = (
    websiteId: string,
    startDate: Date,
    endDate: Date,
    timezone: string
) => {
    const visitors = getVisitorsSubquery(websiteId, startDate, endDate);

    return db.$with("page_views").as(
        db
            .with(visitors)
            .select({
                visitorId: visitors.id,
                page: PageViewTable.page,
                timestamp: sql<string>`${PageViewTable.timestamp} AT TIME ZONE ${timezone}`
                    .inlineParams()
                    .as("timestamp")
            })
            .from(SessionTable)
            .innerJoin(visitors, eq(SessionTable.visitorId, visitors.id))
            .innerJoin(PageViewTable, and(
                eq(PageViewTable.sessionId, SessionTable.id),
                gte(PageViewTable.timestamp, startDate),
                lte(PageViewTable.timestamp, endDate)
            ))
    );
};

export const getVisitorsCount = async (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    const visitors = getVisitorsSubquery(websiteId, startDate, endDate);

    const [{ visitorsCount }] = await db
        .with(visitors)
        .select({ visitorsCount: count() })
        .from(visitors);

    return visitorsCount;
};

export const getBounceRate = async (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    const sessions = getSessionsSubquery(websiteId, startDate, endDate);

    const [{ totalSessions }] = await db
        .with(sessions)
        .select({ totalSessions: count() })
        .from(sessions);

    const singlePageViewSessions = await db
        .with(sessions)
        .select({
            pageViews: count(PageViewTable)
        })
        .from(sessions)
        .innerJoin(PageViewTable, eq(sessions.id, PageViewTable.sessionId))
        .groupBy(sessions.id)
        .having(({ pageViews }) => eq(pageViews, 1));

    const totalSinglePageViewSessions = singlePageViewSessions.length;

    const bounceRate = totalSessions === 0
        ? 0 : (totalSinglePageViewSessions / totalSessions) * 100;

    return Math.round(bounceRate);
};

export const getAverageSessionTime = async (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    const sessions = getSessionsSubquery(websiteId, startDate, endDate);

    const [{ totalDuration, sessionCount }] = await db
        .with(sessions)
        .select({
            totalDuration: sum(sessions.duration),
            sessionCount: count(sessions)
        })
        .from(sessions);

    const averageSessionTime = sessionCount === 0
        ? 0 : Number(totalDuration) / sessionCount;

    return averageSessionTime;
};

export const getLiveVisitorsCount = async (
    websiteId: string,
    endDate: Date
) => {
    const startDate = subMinutes(endDate, 5);
    const visitors = getVisitorsSubquery(websiteId, startDate, endDate);

    const [{ liveVisitorsCount }] = await db
        .with(visitors)
        .select({
            liveVisitorsCount: count()
        })
        .from(visitors);

    return liveVisitorsCount;
};

export const getOverviewChartData = async (
    websiteId: string,
    startDate: Date,
    endDate: Date,
    timezone: string,
    intervalSql: SQL<unknown>,
    joinClause: (timestamp: any, date: SQL<string>) => SQL<unknown> | undefined
) => {
    const pageViews = getPageViewsSubquery(websiteId, startDate, endDate, timezone);

    return await db
        .with(pageViews)
        .select({
            date: sql<string>`${sql.raw("series")}`.inlineParams(),
            totalVisitors: countDistinct(pageViews.visitorId)
        })
        .from(intervalSql)
        .leftJoin(pageViews, ({ date }) => joinClause(pageViews.timestamp, date))
        .groupBy(({ date }) => date)
        .orderBy(({ date }) => date);
};

export const getReferrerChartData = async (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    const visitors = getVisitorsSubquery(websiteId, startDate, endDate);

    return await db
        .with(visitors)
        .select({
            referrer: SessionTable.referrer,
            totalVisitors: countDistinct(visitors.id)
        })
        .from(visitors)
        .innerJoin(SessionTable, and(
            eq(SessionTable.visitorId, visitors.id),
            gte(SessionTable.startTime, startDate),
            lte(SessionTable.startTime, endDate)
        ))
        .groupBy((SessionTable.referrer))
        .orderBy(({ totalVisitors }) => desc(totalVisitors));
};

export const getPageChartData = async (
    websiteId: string,
    startDate: Date,
    endDate: Date,
    timezone: string
) => {
    const pageViews = getPageViewsSubquery(websiteId, startDate, endDate, timezone);

    return await db
        .with(pageViews)
        .select({
            page: pageViews.page,
            totalVisitors: countDistinct(pageViews.visitorId)
        })
        .from(pageViews)
        .groupBy(pageViews.page)
        .orderBy(({ totalVisitors }) => desc(totalVisitors));
};

export const getChartDataFromVisitors = async (
    websiteId: string,
    startDate: Date,
    endDate: Date,
    column: "country" | "region" | "city" | "device" | "browser" | "operatingSystem"
) => {
    const visitors = getVisitorsSubquery(websiteId, startDate, endDate);

    return await db
        .with(visitors)
        .select({
            [column]: visitors[column],
            totalVisitors: count()
        })
        .from(visitors)
        .groupBy(visitors[column])
        .orderBy(({ totalVisitors }) => desc(totalVisitors));
};

export const getUserJourneyData = async (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    const visitors = getVisitorsSubquery(websiteId, startDate, endDate);

    const visitorsWithEvents = await db
        .with(visitors)
        .select({
            id: visitors.id,
            events: sql<{
                sessionId: string;
                eventId: string;
                type: string;
                extraData: Record<string, unknown>;
                timestamp: string;
            }[]>`ARRAY_AGG(
                JSON_BUILD_OBJECT(
                    'sessionId', ${SessionTable.id},
                    'eventId', ${EventTable.id},
                    'type', ${EventTable.type},
                    'extraData', ${EventTable.extraData},
                    'timestamp', ${EventTable.timestamp}
                )
            )`
        })
        .from(SessionTable)
        .innerJoin(visitors, eq(SessionTable.visitorId, visitors.id))
        .innerJoin(EventTable, and(
            eq(EventTable.sessionId, SessionTable.id),
            gte(EventTable.timestamp, startDate),
            lte(EventTable.timestamp, endDate)
        ))
        .groupBy(visitors.id);

    let userJourneyData: UserJourneyData = [];

    await Promise.all(
        visitorsWithEvents.map(async (visitor) => {
            const { id, events } = visitor;

            const [visitorInfo] = await db
                .with(visitors)
                .select({
                    id: visitors.id,
                    name: visitors.name,
                    country: visitors.country,
                    region: visitors.region,
                    city: visitors.city,
                    browser: visitors.browser,
                    operatingSystem: visitors.operatingSystem,
                    device: visitors.device,
                    screenResolution: visitors.screenResolution
                })
                .from(visitors)
                .where(eq(visitors.id, id));

            const visitorSessions = db.$with("visitor_sessions").as(
                db
                    .with(visitors)
                    .select({
                        id: SessionTable.id,
                        visitorId: SessionTable.visitorId,
                        referrer: SessionTable.referrer,
                        startTime: SessionTable.startTime
                    })
                    .from(visitors)
                    .innerJoin(SessionTable, and(
                        eq(SessionTable.visitorId, visitors.id),
                        lte(SessionTable.startTime, endDate)
                    ))
                    .where(eq(visitors.id, visitor.id))
            );

            const [firstSession] = await db
                .with(visitorSessions)
                .select({
                    referrer: visitorSessions.referrer,
                    startTime: visitorSessions.startTime
                })
                .from(visitorSessions)
                .orderBy(visitorSessions.startTime)
                .limit(1);

            await Promise.all(
                events.map(async (event) => {
                    const pageViews = await db
                        .with(visitorSessions)
                        .select({
                            type: sql<"pageview">`'pageview'`.as("type"),
                            value: PageViewTable.page,
                            date: PageViewTable.timestamp
                        })
                        .from(visitorSessions)
                        .innerJoin(PageViewTable, and(
                            eq(PageViewTable.sessionId, visitorSessions.id),
                            lt(PageViewTable.timestamp, new Date(event.timestamp))
                        ))
                        .orderBy(PageViewTable.timestamp);

                    const events = await db
                        .with(visitorSessions)
                        .select({
                            type: EventTable.type,
                            value: EventTable.extraData,
                            date: EventTable.timestamp
                        })
                        .from(visitorSessions)
                        .innerJoin(EventTable, and(
                            eq(EventTable.sessionId, visitorSessions.id),
                            lt(EventTable.timestamp, new Date(event.timestamp))
                        ))
                        .orderBy(EventTable.timestamp);

                    const userJourney = [...pageViews, ...events];
                    userJourney.sort((a, b) => a.date.getTime() - b.date.getTime());

                    const journey = [
                        {
                            type: "referrer",
                            value: firstSession.referrer,
                            date: firstSession.startTime
                        },
                        ...userJourney,
                        {
                            type: event.type,
                            value: event.extraData,
                            date: new Date(event.timestamp)
                        }
                    ];

                    const data = userJourneyData.find((data) => data.type === event.type);

                    if (data) {
                        data.visitors.push({
                            ...visitorInfo, journey
                        });
                    } else {
                        userJourneyData.push({
                            type: event.type,
                            visitors: [{
                                ...visitorInfo, journey
                            }]
                        });
                    }
                })
            );
        })
    );

    return userJourneyData;
};