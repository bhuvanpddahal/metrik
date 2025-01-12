"use client";

import Image from "next/image";
import { Fragment } from "react";
import { SearchIcon } from "lucide-react";
import { format, isSameDay as isSameDayFn } from "date-fns";

import Hint from "@/components/Hint";
import MonoTextBlock from "./MonoTextBlock";
import WebsiteAvatar from "./WebsiteAvatar";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/Table";
import { copyToClipboard } from "@/lib/utils";
import { Drawer, DrawerContent } from "@/components/ui/Drawer";
import { getDomainNameFromUrl, getEventJourneyFormat } from "../utils";
import { useUserJourneyDetailsDrawer } from "../hooks/useUserJourneyDetailsDrawer";

const UserJourneyDetailsDrawer = () => {
    const { isOpen, domain, visitor, close } = useUserJourneyDetailsDrawer();

    if (!domain || !visitor) return null;

    const referrerData = visitor.journey[0];
    let prevEventDate = referrerData.date;

    return (
        <Drawer open={isOpen} onOpenChange={close}>
            <DrawerContent className="max-h-screen rounded-t-none md:rounded-t-3xl overflow-y-auto">
                <div className="flex-shrink-0 max-w-7xl w-full flex flex-col md:flex-row gap-x-12 gap-y-8 p-8 mx-auto">
                    <div className="md:w-56 lg:w-80">
                        <Image
                            src="/icon.svg"
                            alt="User"
                            width={10}
                            height={10}
                            className="size-24 border rounded-full"
                        />
                        <div className="mt-4">
                            <Hint side="right" message="Click to copy">
                                <h3
                                    className="w-fit text-lg font-bold px-1 rounded-sm cursor-pointer hover:bg-muted"
                                    onClick={() => copyToClipboard(visitor.name)}
                                >
                                    {visitor.name}
                                </h3>
                            </Hint>
                            <Hint side="right" message="Click to copy">
                                <p
                                    className="w-fit text-muted-foreground px-1 rounded-sm cursor-pointer hover:bg-muted"
                                    onClick={() => copyToClipboard("user@mail.com")}
                                >
                                    user@mail.com
                                </p>
                            </Hint>
                        </div>
                        <ul className="mt-8 space-y-2">
                            <li className="flex items-center gap-x-2">
                                <Image
                                    src="/icon.svg"
                                    alt="User"
                                    width={10}
                                    height={10}
                                    className="size-5 border rounded"
                                />
                                <span className="text-muted-foreground">
                                    {visitor.country}, {visitor.city}
                                </span>
                            </li>
                            <li className="flex items-center gap-x-2">
                                <Image
                                    src="/icon.svg"
                                    alt="User"
                                    width={10}
                                    height={10}
                                    className="size-5 border rounded"
                                />
                                <span className="text-muted-foreground capitalize">
                                    {visitor.device}
                                    <small className="ml-1">({visitor.screenResolution})</small>
                                </span>
                            </li>
                            <li className="flex items-center gap-x-2">
                                <Image
                                    src="/icon.svg"
                                    alt="User"
                                    width={10}
                                    height={10}
                                    className="size-5 border rounded"
                                />
                                <span className="text-muted-foreground">
                                    {visitor.operatingSystem}
                                </span>
                            </li>
                            <li className="flex items-center gap-x-2">
                                <Image
                                    src="/icon.svg"
                                    alt="User"
                                    width={10}
                                    height={10}
                                    className="size-5 border rounded"
                                />
                                <span className="text-muted-foreground">
                                    {visitor.browser}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-grow">
                        <Table>
                            <TableBody>
                                <TableRow className="sticky top-0 bg-muted hover:bg-muted">
                                    <TableCell className="w-full text-center font-medium">
                                        {format(prevEventDate, "EEEE MMM do',' 	yyyy")}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className="flex items-center justify-between gap-x-2 font-medium">
                                        <div className="flex items-center gap-x-3">
                                            <SearchIcon className="shrink-0 size-5 text-muted-foreground" />
                                            <div>
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
                                {visitor.journey.slice(1).map((event, index) => {
                                    const isSameDay = isSameDayFn(event.date, prevEventDate);
                                    const eventFormat = getEventJourneyFormat(event.type, event.value);
                                    prevEventDate = event.date;

                                    return (
                                        <Fragment key={index}>
                                            {!isSameDay && (
                                                <TableRow className="sticky top-0 bg-muted hover:bg-muted">
                                                    <TableCell className="w-full text-center font-medium">
                                                        {format(prevEventDate, "EEEE MMM do',' 	yyyy")}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            <TableRow className="hover:bg-transparent">
                                                <TableCell className="flex items-center justify-between gap-x-2 font-medium">
                                                    <div className="flex items-center gap-x-3">
                                                        <eventFormat.icon className="shrink-0 size-5 text-muted-foreground" />
                                                        <div>
                                                            {eventFormat.prefixText}
                                                            <MonoTextBlock text={eventFormat.value}>
                                                                {eventFormat.value}
                                                            </MonoTextBlock>
                                                        </div>
                                                    </div>
                                                    <div className="shrink-0">
                                                        {format(prevEventDate, "p")}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default UserJourneyDetailsDrawer;