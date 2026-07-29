import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { formatDistance } from "date-fns";

import WebsiteAvatar from "./WebsiteAvatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/Table";
import type { UserJourneyData } from "../types";
import { getDomainNameFromUrl } from "../utils";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useUserJourneyDetailsDrawer } from "../hooks/useUserJourneyDetailsDrawer";

interface UsersJourneyTableProps {
    domain: string;
    activeEventVisitors: UserJourneyData[number]["visitors"];
}

const UsersJourneyTable = ({
    domain,
    activeEventVisitors
}: UsersJourneyTableProps) => {
    const { open } = useUserJourneyDetailsDrawer();

    return (
        <ScrollArea className="h-[25.875rem]">
            <div className="pt-3 pb-5">
                <Table>
                    <TableHeader className="text-xs">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="px-4">Visitor</TableHead>
                            <TableHead className="px-4">Source</TableHead>
                            <TableHead className="pr-4">Time to complete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeEventVisitors.map((visitor, index) => {
                            const journeyLength = visitor.journey.length;
                            const domainName = getDomainNameFromUrl(visitor.journey[0].value as string | null);
                            const timeToComplete = formatDistance(visitor.journey[journeyLength - 1].date, visitor.journey[0].date);

                            return (
                                <TableRow
                                    key={index}
                                    className="cursor-pointer"
                                    onClick={() => open(domain, visitor)}
                                >
                                    <TableCell className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-2 px-4">
                                        <Image
                                            src="/images/user.jpg"
                                            alt="User"
                                            width={640}
                                            height={640}
                                            className="size-12 border rounded-full"
                                        />
                                        <div>
                                            <h3 className="font-medium">{visitor.name}</h3>
                                            <ul className="flex items-center gap-x-2">
                                                <li className="flex items-center gap-x-1 mt-1">
                                                    <ReactCountryFlag
                                                        countryCode={visitor.countryCode}
                                                        aria-label={visitor.country}
                                                        className="size-3.5 text-xs"
                                                        svg
                                                    />
                                                    <span className="text-muted-foreground text-xs">
                                                        {visitor.country}
                                                    </span>
                                                </li>
                                                <li className="flex items-center gap-x-1">
                                                    <Image
                                                        src={`/images/devices/${visitor.device}.svg`}
                                                        alt={visitor.device}
                                                        width={60}
                                                        height={60}
                                                        className="size-3.5 text-xs"
                                                    />
                                                    <span className="text-muted-foreground text-xs capitalize">
                                                        {visitor.device}
                                                    </span>
                                                </li>
                                                <li className="flex items-center gap-x-1">
                                                    <Image
                                                        src={`/images/os/${visitor.operatingSystem.toLowerCase()}.svg`}
                                                        alt={visitor.operatingSystem}
                                                        width={60}
                                                        height={60}
                                                        className="size-3.5 text-xs"
                                                    />
                                                    <span className="text-muted-foreground text-xs">
                                                        {visitor.operatingSystem}
                                                    </span>
                                                </li>
                                                <li className="flex items-center gap-x-1">
                                                    <Image
                                                        src={`https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.1.0/${visitor.browser.toLowerCase()}/${visitor.browser.toLowerCase()}_64x64.png`}
                                                        alt={visitor.browser}
                                                        width={60}
                                                        height={60}
                                                        className="size-3.5 text-xs"
                                                    />
                                                    <span className="text-muted-foreground text-xs">
                                                        {visitor.browser}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="inline-flex items-center gap-x-2">
                                            <WebsiteAvatar
                                                domain={domainName}
                                                className="size-[1.125rem] inline-block"
                                            />
                                            {domainName}
                                        </div>
                                    </TableCell>
                                    <TableCell>{timeToComplete}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </ScrollArea>
    );
};

export default UsersJourneyTable;