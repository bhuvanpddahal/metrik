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