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

export type VisitorJourney = {
    type: string;
    value: Record<string, unknown> | string | null;
    date: Date | string;
}[];

export type Visitor = {
    id: string;
    name: string;
    country: string;
    countryCode: string;
    region: string;
    city: string;
    browser: string;
    operatingSystem: string;
    device: string;
    screenResolution: string;
    journey: VisitorJourney;
};

export type UserJourneyData = {
    type: string;
    visitors: Visitor[];
}[];