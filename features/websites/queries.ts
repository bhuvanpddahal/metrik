"use server";

import {
    and,
    count,
    countDistinct,
    desc,
    eq,
    gte,
    lte,
    sum
} from "drizzle-orm";
import { JSDOM } from "jsdom";
import { subMinutes } from "date-fns";
import { WithSubqueryWithSelection } from "drizzle-orm/pg-core";

import { db } from "@/drizzle/db";
import { scriptSrc } from "./constants";
import { PageViewTable, SessionTable } from "@/drizzle/schema";

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

export const getVisitorsCount = async (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    const [{ visitorsCount }] = await db
        .select({
            visitorsCount: countDistinct(PageViewTable.visitorId)
        })
        .from(PageViewTable)
        .where(and(
            eq(PageViewTable.websiteId, websiteId),
            gte(PageViewTable.timestamp, startDate),
            lte(PageViewTable.timestamp, endDate)
        ));

    return visitorsCount;
};

export const getBounceRate = async (
    websiteId: string,
    startDate: Date,
    endDate: Date
) => {
    const whereClause = and(
        eq(SessionTable.websiteId, websiteId),
        gte(SessionTable.startTime, startDate),
        lte(SessionTable.startTime, endDate)
    );

    const allSessions = await db
        .select({
            id: SessionTable.id
        })
        .from(SessionTable)
        .where(whereClause);

    const singlePageViewSessions = await db
        .select({
            pageViews: count(PageViewTable)
        })
        .from(SessionTable)
        .innerJoin(PageViewTable, eq(PageViewTable.sessionId, SessionTable.id))
        .where(whereClause)
        .having(({ pageViews }) => eq(pageViews, 1));

    const totalSessions = allSessions.length;
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
    const [{ totalDuration, sessionCount }] = await db
        .select({
            totalDuration: sum(SessionTable.duration),
            sessionCount: count(SessionTable)
        })
        .from(SessionTable)
        .where(and(
            eq(SessionTable.websiteId, websiteId),
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

    const [{ liveVisitorsCount }] = await db
        .select({
            liveVisitorsCount: countDistinct(PageViewTable.visitorId)
        })
        .from(PageViewTable)
        .where(and(
            eq(PageViewTable.websiteId, websiteId),
            gte(PageViewTable.timestamp, startDate),
            lte(PageViewTable.timestamp, endDate)
        ));

    return liveVisitorsCount;
};

type Column = "referrer" | "page" | "country" | "region" | "city" | "device" | "browser" | "operatingSystem";
export type ChartData = { [x: string]: string | number | null; }[];

export const getChartData = async (
    pageViews: WithSubqueryWithSelection<
        typeof PageViewTable._.columns,
        "pageViews"
    >,
    column: Column
): Promise<ChartData> => {
    return await db
        .with(pageViews)
        .select({
            [column]: pageViews[column],
            totalVisitors: countDistinct(pageViews.visitorId)
        })
        .from(pageViews)
        .groupBy(pageViews[column])
        .orderBy(({ totalVisitors }) => desc(totalVisitors));
};