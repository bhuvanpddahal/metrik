import {
    and,
    count,
    countDistinct,
    desc,
    eq,
    gte,
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
import type { SessionsSubquery, VisitorsSubquery } from "./types";

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
                id: SessionTable.id
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
    endDate: Date
) => {
    const visitors = getVisitorsSubquery(websiteId, startDate, endDate);

    return db.$with("page_views").as(
        db
            .with(visitors)
            .select({
                visitorId: visitors.id,
                page: PageViewTable.page,
                timestamp: PageViewTable.timestamp
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
        .innerJoin(PageViewTable, eq(PageViewTable.sessionId, sessions.id))
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
    const visitors = getVisitorsSubquery(websiteId, startDate, endDate);

    const [{ totalDuration, sessionCount }] = await db
        .with(visitors)
        .select({
            totalDuration: sum(SessionTable.duration),
            sessionCount: count(SessionTable)
        })
        .from(visitors)
        .innerJoin(SessionTable, and(
            eq(SessionTable.visitorId, visitors.id),
            gte(SessionTable.startTime, startDate),
            lte(SessionTable.startTime, endDate)
        ));

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
    intervalSql: SQL<unknown>,
    joinClause: (timestamp: any, date: SQL<string>) => SQL<unknown> | undefined
) => {
    const pageViews = getPageViewsSubquery(websiteId, startDate, endDate);

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
        .groupBy(SessionTable.referrer)
        .orderBy(({ totalVisitors }) => desc(totalVisitors));
};

export const getPageChartData = async (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    const pageViews = getPageViewsSubquery(websiteId, startDate, endDate);

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

const getVisitorJourneyTillEvent = async (
    visitorId: string,
    sessionId: string,
    eventId: string
) => {
    const event = await db
        .select()
        .from(EventTable)
        .where(eq(EventTable.id, eventId));

    // const pageViews = await db
    //     .select()
    //     .from(PageViewTable)
    //     .where()
};

export const getUserJourneyData = async (
    visitors: VisitorsSubquery,
    sessions: SessionsSubquery,
    startDate: Date,
    endDate: Date
) => {
    const visitorEvents = await db
        .with(visitors)
        .select({
            visitorId: visitors.id,
            events: sql<{ sessionId: string; eventId: string; timestamp: Date; }[]>`ARRAY_AGG(
                JSON_BUILD_OBJECT(
                    'sessionId', ${SessionTable.id}, 'eventId', ${EventTable.id}, 'timestamp', ${EventTable.timestamp}
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

    const userJourneys = visitorEvents.map(async (visitorEvent) => {
        const visitorId = visitorEvent.visitorId;

        const visitorSessions = await db
            .with(sessions)
            .select()
            .from(sessions)
            .where(eq(sessions.visitors.id, visitorId))
        // b.events.sort(() => );

        const a = visitorEvent.events.map(async (event) => {
            const pageViews = await db
                .with(sessions)
                .select({
                    value: PageViewTable.page,
                    timestamp: PageViewTable.timestamp
                })
                .from(sessions)
                .innerJoin(PageViewTable, and(
                    eq(PageViewTable.sessionId, sessions.sessions.id),
                    lte(PageViewTable.timestamp, event.timestamp)
                ))
                .orderBy(PageViewTable.timestamp);


        });
    });

    // const outputData = a.reduce<string[]>((acc, curr) => {
    //     const { eventType, ...visitor } = curr;

    //     const existingIndex = acc.findIndex((item) => item.eventType === eventType);

    //     if (existingIndex !== -1) {
    //         acc[existingIndex].visitorIds.push(visitorId);
    //     } else {
    //         acc.push({ eventType, visitorIds: [visitorId] });
    //     }

    //     return acc;
    // }, []);
};