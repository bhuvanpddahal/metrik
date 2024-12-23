"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDownIcon, PlusIcon, ScanIcon } from "lucide-react";

import DistributionChart from "./DistributionChart";
import UsersJourneyTable from "./UsersJourneyTable";
import GoalsCardLoader from "./skeletons/GoalsCardLoader";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/Card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { ensureExactLengthForChartData } from "../utils";
import { useGetWebsiteData } from "../hooks/useGetWebsiteData";
import { Button, buttonVariants } from "@/components/ui/Button";
import { useGetWebsiteHeader } from "../hooks/useGetWebsiteHeader";
import { useWebsiteDetailsSearchParams } from "../hooks/useWebsiteDetailsSearchParams";

interface GoalsCardProps {
    domain: string;
}

const GoalsCard = (
    { domain }: GoalsCardProps
) => {
    const { interval } = useWebsiteDetailsSearchParams();
    const { isError } = useGetWebsiteData(domain, interval);
    const { isInitialLoading } = useGetWebsiteHeader(domain);
    const [activeMenu, setActiveMenu] = useState<"goal" | "journey">("goal");

    if (isInitialLoading) return <GoalsCardLoader />
    if (isError) return null;

    const chartData = [
        { event: "signup", totalVisitors: 1 }
    ];

    return (
        <Card className="md:col-span-2 overflow-hidden">
            <CardHeader className="flex-row items-center gap-x-1 p-1 border-b space-y-0">
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
                <span className="text-muted-foreground text-sm">for</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2 font-semibold">
                            {"signup"}
                            <ChevronDownIcon className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => setActiveMenu("goal")}>signup</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            {/* px-0 pt-5 */}
            <CardContent className="relative p-0">
                {/* <DistributionChart
                    chartData={ensureExactLengthForChartData([...chartData])}
                    dataKey={"event"}
                /> */}
                {/* <div className="absolute inset-0 bg-logo-light opacity-[0.03] pointer-events-none dark:bg-logo-dark" />
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
                </div> */}
                <UsersJourneyTable />
            </CardContent>
            {/* <CardFooter className="justify-center">
                <div
                    className="flex items-center gap-x-1 text-muted-foreground cursor-pointer hover:text-foreground"
                // onClick={() => open({ title: label, chartData, dataKey: activeMenu })}
                >
                    <ScanIcon className="size-4" />
                    <div className="text-xs font-semibold mt-0.5">DETAILS</div>
                </div>
            </CardFooter> */}
        </Card >
    );
};

export default GoalsCard;