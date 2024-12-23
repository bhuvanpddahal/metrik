"use client";

import Image from "next/image";

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
import { useUserJourneyDetailsDrawer } from "../hooks/useUserJourneyDetailsDrawer";

const UserJourneyDetailsDrawer = () => {
    const { isOpen, close } = useUserJourneyDetailsDrawer();

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
                                    onClick={() => copyToClipboard("user name")}
                                >
                                    user name
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
                                <span className="text-muted-foreground">Country, City</span>
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
                                    Device
                                    <small className="ml-1">(785 x 763)</small>
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
                                <span className="text-muted-foreground">Operating System</span>
                            </li>
                            <li className="flex items-center gap-x-2">
                                <Image
                                    src="/icon.svg"
                                    alt="User"
                                    width={10}
                                    height={10}
                                    className="size-5 border rounded"
                                />
                                <span className="text-muted-foreground">Browser</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-grow">
                        <Table>
                            <TableBody>
                                <TableRow className="sticky top-0 bg-muted hover:bg-muted">
                                    <TableCell className="w-full text-center font-medium">
                                        Friday Dec 13th, 2024
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className="flex items-center justify-between gap-x-2 font-medium">
                                        <div>
                                            Found
                                            <MonoTextBlock text="abc.com">abc.com</MonoTextBlock>
                                            via
                                            <MonoTextBlock text="Direct/None">
                                                <WebsiteAvatar domain={"Direct"} className="size-3 inline-block" />
                                                Direct/None
                                            </MonoTextBlock>
                                        </div>
                                        <div className="shrink-0">
                                            1:53 AM
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className="flex items-center justify-between gap-x-2 font-medium">
                                        <div>
                                            Viewed page
                                            <MonoTextBlock text="/">/</MonoTextBlock>
                                        </div>
                                        <div>
                                            1:53 AM
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="bg-muted hover:bg-muted">
                                    <TableCell className="w-full text-center font-medium">
                                        Friday Dec 13th, 2024
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className="flex items-center justify-between gap-x-2 font-medium">
                                        <div>
                                            Found
                                            <MonoTextBlock text="abc.com">abc.com</MonoTextBlock>
                                            via
                                            <MonoTextBlock text="Direct/None">
                                                <WebsiteAvatar domain={"Direct"} className="size-3 inline-block" />
                                                Direct/None
                                            </MonoTextBlock>
                                        </div>
                                        <div>
                                            1:53 AM
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className="flex items-center justify-between gap-x-2 font-medium">
                                        <div>
                                            Viewed page
                                            <MonoTextBlock text="/">/</MonoTextBlock>
                                        </div>
                                        <div>
                                            1:53 AM
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default UserJourneyDetailsDrawer;