import { subDays } from "date-fns";
import { SQL, sql } from "drizzle-orm";

import { env } from "@/constants/env/client";

export const timezones = {
    "Etc/GMT+12": "(GMT-12:00) Etc/GMT+12",
    "Asia/Qostanay": "(GMT+06:00) Asia/Qostanay"
};

export const scriptSrc = `${env.NEXT_PUBLIC_APP_URL}/js/script.js`;

export const CHART_INTERVALS = {
    today: {
        dateFormatter: (date: Date) => dateFormatter.format(date),
        startDate: subDays(new Date(), 1),
        label: "Today",
        sql: sql`GENERATE_SERIES(current_date - 1, current_date, '1 hour'::interval) as series`,
        dateGrouper: (col: SQL | SQL.Aliased) =>
            sql<string>`DATE(${col})`.inlineParams()
    },
    last7Days: {
        dateFormatter: (date: Date) => dateFormatter.format(date),
        startDate: subDays(new Date(), 7),
        label: "Last 7 Days",
        sql: sql`GENERATE_SERIES(current_date - 7, current_date, '1 day'::interval) as series`,
        dateGrouper: (col: SQL | SQL.Aliased) =>
            sql<string>`DATE(${col})`.inlineParams()
    },
    last30Days: {
        dateFormatter: (date: Date) => dateFormatter.format(date),
        startDate: subDays(new Date(), 30),
        label: "Last 30 Days",
        sql: sql`GENERATE_SERIES(current_date - 30, current_date, '1 day'::interval) as series`,
        dateGrouper: (col: SQL | SQL.Aliased) =>
            sql<string>`DATE(${col})`.inlineParams()
    },
    last365Days: {
        dateFormatter: (date: Date) => monthFormatter.format(date),
        startDate: subDays(new Date(), 365),
        label: "Last 365 Days",
        sql: sql`GENERATE_SERIES(DATE_TRUNC('month', current_date - 365), DATE_TRUNC('month', current_date), '1 month'::interval) as series`,
        dateGrouper: (col: SQL | SQL.Aliased) =>
            sql<string>`DATE_TRUNC('month', ${col})`.inlineParams()
    }
};

export const sqlDate = {
    extractDate: (col: any) =>
        sql<string>`DATE(${col})`.inlineParams(),
    extractHour: (col: any) =>
        sql<number>`DATE_PART('hour', ${col})`.inlineParams()
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeZone: "UTC"
});

const monthFormatter = new Intl.DateTimeFormat(undefined, {
    year: "2-digit",
    month: "short",
    timeZone: "UTC"
});