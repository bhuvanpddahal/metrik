import Image from "next/image";
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
                    <TableHeader className="text-xs font-semibold">
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
                                            <h3 className="font-semibold">{visitor.name}</h3>
                                            <ul className="flex items-center gap-x-2">
                                                <li className="flex items-center gap-x-1 mt-1">
                                                    <Image
                                                        src="/icon.svg"
                                                        alt="User"
                                                        width={10}
                                                        height={10}
                                                        className="size-3.5 border rounded"
                                                    />
                                                    <span className="text-muted-foreground text-xs">
                                                        {visitor.country}
                                                    </span>
                                                </li>
                                                <li className="flex items-center gap-x-1">
                                                    <Image
                                                        src="/icon.svg"
                                                        alt="User"
                                                        width={10}
                                                        height={10}
                                                        className="size-3.5 border rounded"
                                                    />
                                                    <span className="text-muted-foreground text-xs capitalize">
                                                        {visitor.device}
                                                    </span>
                                                </li>
                                                <li className="flex items-center gap-x-1">
                                                    <Image
                                                        src="/icon.svg"
                                                        alt="User"
                                                        width={10}
                                                        height={10}
                                                        className="size-3.5 border rounded"
                                                    />
                                                    <span className="text-muted-foreground text-xs">
                                                        {visitor.operatingSystem}
                                                    </span>
                                                </li>
                                                <li className="flex items-center gap-x-1">
                                                    <Image
                                                        src="/icon.svg"
                                                        alt="User"
                                                        width={10}
                                                        height={10}
                                                        className="size-3.5 border rounded"
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