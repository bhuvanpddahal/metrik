"use server";

import { JSDOM } from "jsdom";
import { countDistinct, desc } from "drizzle-orm";
import { WithSubqueryWithSelection } from "drizzle-orm/pg-core";

import { db } from "@/drizzle/db";
import { scriptSrc } from "./constants";
import { PageViewTable } from "@/drizzle/schema";

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

export const getWebsiteById = async (websiteId: string) => {
    const website = await db.query.WebsiteTable.findFirst({
        where: ({ id }, { eq }) => eq(id, websiteId)
    });

    return website;
};

type Column = "referrer" | "page" | "country" | "region" | "city" | "device" | "browser" | "operatingSystem";
export type ChartData = { [x: string]: string | number | null; }[];
// type ChartData = { [key in Column]: string | null; } & { totalVisitors: number; };
// type a = Pick<ChartData, "page" | "totalVisitors">;

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