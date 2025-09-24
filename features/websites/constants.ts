import {
    endOfDay,
    endOfMonth,
    endOfWeek,
    endOfYear,
    startOfDay,
    startOfMonth,
    startOfWeek,
    startOfYear,
    subDays,
    subMonths,
    subWeeks,
    subYears
} from "date-fns";
import { sql } from "drizzle-orm";

import {
    formatDateToDayMonth,
    formatDateToMonthYear,
    formatTimeToAmPm,
    generateJoinClauseForNow,
    generateJoinClauseForWeekOrMonth,
    generateJoinClauseForYear,
    generateSqlSeriesForNow,
    generateSqlSeriesForWeeksOrMonth,
    generateSqlSeriesForYear
} from "@/features/websites/utils";
import { env } from "@/constants/env/client";

export const scriptSrc = `${env.NEXT_PUBLIC_APP_URL}/js/script.js`;
export const LIVE_VISITORS_THRESHOLD_IN_MINUTES = 5;

const currentDate = new Date();

export const NOW_CHART_INTERVALS = {
    today: {
        prevStartDate: undefined,
        startDate: startOfDay(currentDate),
        endDate: endOfDay(currentDate),
        label: "Today",
        get sql() { return generateSqlSeriesForNow(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForNow,
        dateFormatter: formatTimeToAmPm
    },
    last24Hours: {
        prevStartDate: subDays(currentDate, 2),
        startDate: subDays(currentDate, 1),
        endDate: currentDate,
        label: "Last 24 Hours",
        get sql() { return generateSqlSeriesForNow(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForNow,
        dateFormatter: formatTimeToAmPm
    },
    yesterday: {
        prevStartDate: startOfDay(subDays(currentDate, 2)),
        startDate: startOfDay(subDays(currentDate, 1)),
        endDate: endOfDay(subDays(currentDate, 1)),
        label: "Yesterday",
        get sql() { return generateSqlSeriesForNow(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForNow,
        dateFormatter: formatTimeToAmPm
    }
} as const;

export const WEEK_CHART_INTERVALS = {
    thisWeek: {
        prevStartDate: undefined,
        startDate: startOfWeek(currentDate),
        endDate: endOfWeek(currentDate),
        label: "This Week",
        get sql() { return generateSqlSeriesForWeeksOrMonth(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForWeekOrMonth,
        dateFormatter: formatDateToDayMonth
    },
    last7Days: {
        prevStartDate: subWeeks(currentDate, 2),
        startDate: subWeeks(currentDate, 1),
        endDate: currentDate,
        label: "Last 7 Days",
        get sql() { return generateSqlSeriesForWeeksOrMonth(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForWeekOrMonth,
        dateFormatter: formatDateToDayMonth
    },
    lastWeek: {
        prevStartDate: startOfWeek(subWeeks(currentDate, 2)),
        startDate: startOfWeek(subWeeks(currentDate, 1)),
        endDate: endOfWeek(subWeeks(currentDate, 1)),
        label: "Last Week",
        get sql() { return generateSqlSeriesForWeeksOrMonth(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForWeekOrMonth,
        dateFormatter: formatDateToDayMonth
    }
} as const;

export const MONTH_CHART_INTERVALS = {
    thisMonth: {
        prevStartDate: undefined,
        startDate: startOfMonth(currentDate),
        endDate: endOfMonth(currentDate),
        label: "This Month",
        get sql() { return generateSqlSeriesForWeeksOrMonth(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForWeekOrMonth,
        dateFormatter: formatDateToDayMonth
    },
    last30Days: {
        prevStartDate: subDays(currentDate, 60),
        startDate: subDays(currentDate, 30),
        endDate: currentDate,
        label: "Last 30 Days",
        get sql() { return generateSqlSeriesForWeeksOrMonth(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForWeekOrMonth,
        dateFormatter: formatDateToDayMonth
    },
    lastMonth: {
        prevStartDate: startOfMonth(subMonths(currentDate, 2)),
        startDate: startOfMonth(subMonths(currentDate, 1)),
        endDate: endOfMonth(subMonths(currentDate, 1)),
        label: "Last Month",
        get sql() { return generateSqlSeriesForWeeksOrMonth(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForWeekOrMonth,
        dateFormatter: formatDateToDayMonth
    }
} as const;

export const YEAR_CHART_INTERVALS = {
    thisYear: {
        prevStartDate: undefined,
        startDate: startOfYear(currentDate),
        endDate: endOfYear(currentDate),
        label: "This Year",
        get sql() { return generateSqlSeriesForYear(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForYear,
        dateFormatter: formatDateToMonthYear
    },
    last12Months: {
        prevStartDate: subMonths(currentDate, 24),
        startDate: subMonths(currentDate, 12),
        endDate: currentDate,
        label: "Last 12 Months",
        get sql() { return generateSqlSeriesForYear(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForYear,
        dateFormatter: formatDateToMonthYear
    },
    lastYear: {
        prevStartDate: startOfYear(subYears(currentDate, 2)),
        startDate: startOfYear(subYears(currentDate, 1)),
        endDate: endOfYear(subYears(currentDate, 1)),
        label: "Last Year",
        get sql() { return generateSqlSeriesForYear(this.startDate, this.endDate); },
        joinClause: generateJoinClauseForYear,
        dateFormatter: formatDateToMonthYear
    }
} as const;

export const ALL_TIME_CHART_INTERVAL = {
    prevStartDate: undefined,
    startDate: undefined,
    endDate: currentDate,
    label: "All Time",
    sql: undefined,
    joinClause: undefined,
    dateFormatter: undefined
} as const;

export const OVERVIEW_CHART_INTERVALS = {
    ...NOW_CHART_INTERVALS,
    ...WEEK_CHART_INTERVALS,
    ...MONTH_CHART_INTERVALS,
    ...YEAR_CHART_INTERVALS,
    allTime: ALL_TIME_CHART_INTERVAL
} as const;

export type OverviewChartIntervalKey = keyof typeof OVERVIEW_CHART_INTERVALS;
export type OverviewChartIntervalLabel = (typeof OVERVIEW_CHART_INTERVALS)[OverviewChartIntervalKey]["label"];

export const overviewChartIntervalsKeys = Object.keys(OVERVIEW_CHART_INTERVALS) as OverviewChartIntervalKey[];

export const sqlDate = {
    extractDate: (col: any) =>
        sql<string>`DATE(${col})`.inlineParams(),
    extractHour: (col: any) =>
        sql<number>`DATE_PART('hour', ${col})`.inlineParams(),
    extractWeek: (col: any) =>
        sql<number>`DATE_PART('week', ${col})`.inlineParams(),
    extractMonth: (col: any) =>
        sql<number>`DATE_PART('month', ${col})`.inlineParams(),
    extractQuarter: (col: any) =>
        sql<number>`DATE_PART('quarter', ${col})`.inlineParams(),
    extractYear: (col: any) =>
        sql<number>`DATE_PART('year', ${col})`.inlineParams()
};