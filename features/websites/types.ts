import { WithSubqueryWithSelection } from "drizzle-orm/pg-core";

import { SessionTable, VisitorTable } from "@/drizzle/schema";

export type VisitorsSubquery = WithSubqueryWithSelection<
    typeof VisitorTable._.columns,
    "visitors"
>;
export type SessionsSubquery = WithSubqueryWithSelection<{
    visitors: typeof VisitorTable._.columns,
    sessions: typeof SessionTable._.columns
}, "sessions">;

export type ChartData = { [x: string]: string | number | null; }[];

export type Visitor = {
    id: string;
    name: string;
    country: string;
    region: string;
    city: string;
    browser: string;
    operatingSystem: string;
    device: string;
    screenResolution: string;
    journey: {
        type: string;
        value: Record<string, unknown> | string | null;
        date: Date | string;
    }[];
};

export type UserJourneyData = {
    type: string;
    visitors: Visitor[];
}[];