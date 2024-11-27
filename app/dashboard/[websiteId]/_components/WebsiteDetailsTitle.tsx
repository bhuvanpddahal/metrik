import Link from "next/link";
import {
    ChevronDownIcon,
    SquareArrowOutUpRightIcon
} from "lucide-react";

import WebsiteAvatar from "@/features/websites/components/WebsiteAvatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { Button, buttonVariants } from "@/components/ui/Button";

const WebsiteDetailsTitle = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <div className="flex items-center gap-x-1">
                                <WebsiteAvatar domain="google.com" className="border-none" />
                                <p className="font-semibold leading-none tracking-tight">google.com</p>
                            </div>
                            <ChevronDownIcon className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Site settings</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Today
                            <ChevronDownIcon className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Today</DropdownMenuItem>
                        <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                        <DropdownMenuItem>Yesterday</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>This week</DropdownMenuItem>
                        <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                        <DropdownMenuItem>Last week</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Link
                href="https://google.com"
                target="_blank"
                className={buttonVariants({ variant: "outline", size: "icon" })}
            >
                <SquareArrowOutUpRightIcon className="size-4" />
            </Link>
        </div>
    );
};

export default WebsiteDetailsTitle;