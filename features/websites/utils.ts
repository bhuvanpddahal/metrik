import {
    CircleDollarSignIcon,
    EyeIcon,
    GoalIcon,
    UserPlusIcon
} from "lucide-react";
import {
    adjectives,
    animals,
    colors,
    names,
    uniqueNamesGenerator
} from "unique-names-generator";
import { and, eq, SQL, sql } from "drizzle-orm";
import { differenceInDays, format } from "date-fns";

import { sqlDate } from "./constants";
import type { ChartData } from "./types";

export const generateRandomNameForVisitor = () => {
    return uniqueNamesGenerator({
        dictionaries: [names, adjectives, animals, colors],
        length: 2,
        separator: " "
    });
};

export const ensureExactLengthForChartData = (
    chartData: ChartData,
    length = 10
) => {
    const dataLength = chartData.length;
    if (dataLength === length) return chartData;

    const diffInLength = length - dataLength;

    if (diffInLength > 0) {
        chartData.push(...Array(diffInLength).fill({}));
    } else {
        chartData.splice(diffInLength);
    }

    return chartData;
};

export const getDomainNameFromUrl = (url: string | null) => {
    try {
        if (!url) return "Direct/None";

        const urlObject = new URL(url);
        return urlObject.host;
    } catch (error) {
        console.error("Invalid URL:", url, error);
        return url as string;
    }
};

export const getOriginFromUrl = (url: string | null) => {
    try {
        if (!url) return null;

        const urlObject = new URL(url);
        return urlObject.origin;
    } catch (error) {
        console.error("Invalid URL:", url, error);
        return null;
    }
};

export const getPathnameAndSearchFromUrl = (url: string | null) => {
    try {
        if (!url) return "";

        const urlObject = new URL(url);
        return `${urlObject.pathname}${urlObject.search}`;
    } catch (error) {
        console.error("Invalid URL:", url, error);
        return "";
    }
};

export const getEventJourneyFormat = (
    eventType: string,
    value: Record<string, unknown> | string | null
) => {
    switch (eventType) {
        case "pageview":
            return {
                icon: EyeIcon,
                prefixText: "Viewed page",
                value: getPathnameAndSearchFromUrl(value as string)
            };
        case "signup":
            return {
                icon: UserPlusIcon,
                prefixText: "Signed up as",
                value: (value as Record<string, string>).email
            };
        case "payment":
            return {
                icon: CircleDollarSignIcon,
                prefixText: "Purchased a plan as",
                value: (value as Record<string, string>).email
            };
        default:
            return {
                icon: GoalIcon,
                prefixText: "Completed the event",
                value: eventType
            };
    }
};

export function formatTimeToAmPm(date: Date | string) { return format(date, "h a"); }
export function formatDateToDayMonth(date: Date | string) { return format(date, "dd MMM"); }
export function formatDateToWeekYear(date: Date | string) { return format(date, "wo 'week,' yyyy"); }
export function formatDateToMonthYear(date: Date | string) { return format(date, "MMM yyyy"); }
export function formatDateToQuarterYear(date: Date | string) { return format(date, "QQQQ yyyy"); }
export function formatDateToYear(date: Date | string) { return format(date, "yyyy"); }
export function formatNumberToMinuteSecond(num: number) { return `${Math.floor(num / 60)}m ${Math.round(num % 60)}s`; }

export function getDateFormatterFromDateDiff(startDate: Date | string, endDate: Date | string) {
    const daysDiff = differenceInDays(endDate, startDate);

    if (daysDiff <= 1) return formatTimeToAmPm; // 1 day or less
    if (daysDiff <= 30) return formatDateToDayMonth; // 1 month or less
    if (daysDiff <= 8 * 30) return formatDateToWeekYear; // 8 months or less
    if (daysDiff <= 2 * 12 * 30) return formatDateToMonthYear; // 2 years or less
    if (daysDiff <= 10 * 12 * 30) return formatDateToQuarterYear; // 10 years or less

    return formatDateToYear;
}

const generateSqlSeries = (
    startDate: Date,
    endDate: Date,
    interval: string
) => sql`GENERATE_SERIES(${startDate}, ${endDate}, ${interval}::interval) as series`;

export const generateSqlSeriesForNow = (startDate: Date, endDate: Date) =>
    generateSqlSeries(startDate, endDate, "1 hour");
export const generateSqlSeriesForWeeksOrMonth = (startDate: Date, endDate: Date) =>
    generateSqlSeries(startDate, endDate, "1 day");
export const generateSqlSeriesForMultiMonths = (startDate: Date, endDate: Date) =>
    generateSqlSeries(startDate, endDate, "1 week");
export const generateSqlSeriesForYear = (startDate: Date, endDate: Date) =>
    generateSqlSeries(startDate, endDate, "1 month");
export const generateSqlSeriesForMultiYears = (startDate: Date, endDate: Date) =>
    generateSqlSeries(startDate, endDate, "3 months");
export const generateSqlSeriesForDecade = (startDate: Date, endDate: Date) =>
    generateSqlSeries(startDate, endDate, "1 year");

export const generateSqlSeriesFromDateDiff = (startDate: Date, endDate: Date) => {
    const daysDiff = differenceInDays(endDate, startDate);

    if (daysDiff <= 1) return generateSqlSeriesForNow(startDate, endDate); // 1 day or less
    if (daysDiff <= 30) return generateSqlSeriesForWeeksOrMonth(startDate, endDate); // 1 month or less
    if (daysDiff <= 8 * 30) return generateSqlSeriesForMultiMonths(startDate, endDate); // 8 months or less
    if (daysDiff <= 2 * 12 * 30) return generateSqlSeriesForYear(startDate, endDate); // 2 years or less
    if (daysDiff <= 10 * 12 * 30) return generateSqlSeriesForMultiYears(startDate, endDate); // 10 years or less

    return generateSqlSeriesForDecade(startDate, endDate);
};

export function generateJoinClauseForNow(timestamp: any, date: SQL<string>) {
    return and(
        eq(sqlDate.extractDate(timestamp), sqlDate.extractDate(date)),
        eq(sqlDate.extractHour(timestamp), sqlDate.extractHour(date))
    );
}
export function generateJoinClauseForWeekOrMonth(timestamp: any, date: SQL<string>) {
    return eq(sqlDate.extractDate(timestamp), sqlDate.extractDate(date));
}
export function generateJoinClauseForMultiMonths(timestamp: any, date: SQL<string>) {
    return and(
        eq(sqlDate.extractMonth(timestamp), sqlDate.extractMonth(date)),
        eq(sqlDate.extractWeek(timestamp), sqlDate.extractWeek(date))
    );
}
export function generateJoinClauseForYear(timestamp: any, date: SQL<string>) {
    return and(
        eq(sqlDate.extractYear(timestamp), sqlDate.extractYear(date)),
        eq(sqlDate.extractMonth(timestamp), sqlDate.extractMonth(date))
    );
}
export function generateJoinClauseForMultiYears(timestamp: any, date: SQL<string>) {
    return and(
        eq(sqlDate.extractYear(timestamp), sqlDate.extractYear(date)),
        eq(sqlDate.extractQuarter(timestamp), sqlDate.extractQuarter(date))
    );
}
export function generateJoinClauseForDecade(timestamp: any, date: SQL<string>) {
    return eq(sqlDate.extractYear(timestamp), sqlDate.extractYear(date));
}

export const generateJoinClauseFromDateDiff = (startDate: Date, endDate: Date) => {
    const daysDiff = differenceInDays(endDate, startDate);

    if (daysDiff <= 1) return generateJoinClauseForNow; // 1 day or less
    if (daysDiff <= 30) return generateJoinClauseForWeekOrMonth; // 1 month or less
    if (daysDiff <= 8 * 30) return generateJoinClauseForMultiMonths; // 8 months or less
    if (daysDiff <= 2 * 12 * 30) return generateJoinClauseForYear; // 2 years or less
    if (daysDiff <= 10 * 12 * 30) return generateJoinClauseForMultiYears; // 10 years or less

    return generateJoinClauseForDecade;
};