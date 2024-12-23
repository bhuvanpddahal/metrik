import Image from "next/image";

import WebsiteAvatar from "./WebsiteAvatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/Table";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useUserJourneyDetailsDrawer } from "../hooks/useUserJourneyDetailsDrawer";

const UsersJourneyTable = () => {
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
                        {Array.from({ length: 10 }).map((_, index) => (
                            <TableRow key={index} className="cursor-pointer" onClick={open}>
                                <TableCell className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-2 px-4">
                                    <Image
                                        src="/icon.svg"
                                        alt="User"
                                        width={10}
                                        height={10}
                                        className="size-12 border rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold">user name</h3>
                                        <ul className="flex items-center gap-x-2">
                                            <li className="flex items-center gap-x-1 mt-1">
                                                <Image
                                                    src="/icon.svg"
                                                    alt="User"
                                                    width={10}
                                                    height={10}
                                                    className="size-3.5 border rounded"
                                                />
                                                <span className="text-muted-foreground text-xs">Country</span>
                                            </li>
                                            <li className="flex items-center gap-x-1">
                                                <Image
                                                    src="/icon.svg"
                                                    alt="User"
                                                    width={10}
                                                    height={10}
                                                    className="size-3.5 border rounded"
                                                />
                                                <span className="text-muted-foreground text-xs">Device</span>
                                            </li>
                                            <li className="flex items-center gap-x-1">
                                                <Image
                                                    src="/icon.svg"
                                                    alt="User"
                                                    width={10}
                                                    height={10}
                                                    className="size-3.5 border rounded"
                                                />
                                                <span className="text-muted-foreground text-xs">Operating System</span>
                                            </li>
                                            <li className="flex items-center gap-x-1">
                                                <Image
                                                    src="/icon.svg"
                                                    alt="User"
                                                    width={10}
                                                    height={10}
                                                    className="size-3.5 border rounded"
                                                />
                                                <span className="text-muted-foreground text-xs">Browser</span>
                                            </li>
                                        </ul>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="inline-flex items-center gap-x-2">
                                        <WebsiteAvatar domain={"Direct"} className="size-[1.125rem] size- inline-block" />
                                        Direct/None
                                    </div>
                                </TableCell>
                                <TableCell>3 days</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </ScrollArea>
    );
};

export default UsersJourneyTable;