"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon, PlusIcon } from "lucide-react";

import AddGoalsCardLoader from "./skeletons/AddGoalsCardLoader";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/Card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { useGetWebsiteData } from "../hooks/useGetWebsiteData";
import { Button, buttonVariants } from "@/components/ui/Button";
import { useGetWebsiteHeader } from "../hooks/useGetWebsiteHeader";
import { useWebsiteDetailsSearchParams } from "../hooks/useWebsiteDetailsSearchParams";

interface AddGoalsCardProps {
    domain: string;
}

const AddGoalsCard = (
    { domain }: AddGoalsCardProps
) => {
    const { interval } = useWebsiteDetailsSearchParams();
    const { isError } = useGetWebsiteData(domain, interval);
    const { isInitialLoading } = useGetWebsiteHeader(domain);
    const [activeMenu, setActiveMenu] = useState<"goal" | "journey">("goal");

    if (isInitialLoading) return <AddGoalsCardLoader />
    if (isError) return null;

    return (
        <Card className="md:col-span-2 overflow-hidden">
            <CardHeader className="p-1 border-b">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2 font-semibold capitalize">
                            {activeMenu}
                            <ChevronDownIcon className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => setActiveMenu("goal")}>Goal</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveMenu("journey")}>Journey</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="relative h-96">
                <div className="absolute inset-0 bg-logo opacity-5 pointer-events-none dark:hidden" />
                <div className="relative h-full flex flex-col items-center justify-center gap-y-3">
                    <p className="font-semibold">
                        {activeMenu === "goal"
                            ? "Track what visitors do on your site"
                            : "Discover what visitors do before completing a goal"
                        }
                    </p>
                    <Link
                        href={`/dashboard/${domain}/settings?tab=goals`}
                        className={buttonVariants()}
                    >
                        <PlusIcon className="size-3" />
                        Add goals
                    </Link>
                </div>
            </CardContent>
        </Card >
    );
};

export default AddGoalsCard;