import { Fragment } from "react";
import { SearchIcon } from "lucide-react";
import { format, isSameDay as isSameDayFn } from "date-fns";

import MonoTextBlock from "./MonoTextBlock";
import WebsiteAvatar from "./WebsiteAvatar";
import CustomEventData from "./CustomEventData";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/Table";
import type { VisitorJourney } from "../types";
import { getDomainNameFromUrl, getEventJourneyFormat } from "../utils";

interface VisitorEventsTimelineProps {
    domain: string;
    journey: VisitorJourney;
}

const VisitorEventsTimeline = ({ domain, journey }: VisitorEventsTimelineProps) => {
    const referrerData = journey[0];
    let prevEventDate = referrerData.date;

    return (
        <div className="flex-grow px-5 md:px-0">
            <Table>
                <TableBody>
                    <TableRow className="sticky top-0 bg-muted hover:bg-muted">
                        <TableCell className="w-full text-center">
                            {format(prevEventDate, "EEEE MMM do',' 	yyyy")}
                        </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                        <TableCell className="flex items-center justify-between gap-x-2">
                            <div className="flex items-center gap-x-3">
                                <SearchIcon className="shrink-0 size-5 text-muted-foreground" />
                                <div className="leading-[1.8]">
                                    Found
                                    <MonoTextBlock text={domain}>{domain}</MonoTextBlock>
                                    via
                                    <MonoTextBlock text={(referrerData.value ?? "Direct/None") as string}>
                                        <WebsiteAvatar
                                            domain={(referrerData.value ?? "") as string}
                                            className="size-3 inline-block"
                                        />
                                        {getDomainNameFromUrl(referrerData.value as string | null)}
                                    </MonoTextBlock>
                                </div>
                            </div>
                            <div className="shrink-0">
                                {format(prevEventDate, "p")}
                            </div>
                        </TableCell>
                    </TableRow>
                    {journey.slice(1).map((event, index) => {
                        const isSameDay = isSameDayFn(event.date, prevEventDate);
                        const eventFormat = getEventJourneyFormat(event.type, event.value);
                        const isEventValueObject = typeof event.value === "object" && event.value !== null;
                        prevEventDate = event.date;

                        return (
                            <Fragment key={index}>
                                {!isSameDay && (
                                    <TableRow className="sticky top-0 bg-muted hover:bg-muted">
                                        <TableCell className="w-full text-center">
                                            {format(prevEventDate, "EEEE MMM do',' 	yyyy")}
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow className="hover:bg-transparent">
                                    <TableCell>
                                        <div className="flex items-center justify-between gap-x-2">
                                            <div className="flex items-center gap-x-3">
                                                <eventFormat.icon className="shrink-0 size-5 text-muted-foreground" />
                                                <div className="leading-[1.8]">
                                                    {eventFormat.prefixText}
                                                    <MonoTextBlock text={eventFormat.value}>
                                                        {eventFormat.value}
                                                    </MonoTextBlock>
                                                </div>
                                            </div>
                                            <div className="shrink-0">
                                                {format(prevEventDate, "p")}
                                            </div>
                                        </div>
                                        {isEventValueObject && (
                                            <CustomEventData data={event.value as Record<string, unknown>} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            </Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default VisitorEventsTimeline;