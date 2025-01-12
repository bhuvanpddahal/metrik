"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDownIcon, PlusIcon, ScanIcon } from "lucide-react";

import DistributionChart from "./DistributionChart";
import UsersJourneyTable from "./UsersJourneyTable";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { ensureExactLengthForChartData } from "../utils";
import type { ChartData, UserJourneyData } from "../types";
import { Button, buttonVariants } from "@/components/ui/Button";
import { useDistributionDetailsModal } from "../hooks/useDistributionDetailsModal";

interface GoalsCardProps {
    domain: string;
    goalChartData: ChartData;
    userJourneyData: UserJourneyData;
}

const GoalsCard = ({
    domain,
    goalChartData,
    userJourneyData
}: GoalsCardProps) => {
    const { open } = useDistributionDetailsModal();
    const [activeEventIndex, setActiveEventIndex] = useState(0);
    const [activeMenu, setActiveMenu] = useState<"goal" | "journey">("goal");

    const activeEvent = userJourneyData[activeEventIndex];

    return (
        <Card className="md:col-span-2 overflow-hidden">
            <CardHeader className="flex-row items-center gap-x-3 p-1 border-b space-y-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2 font-semibold capitalize">
                            {activeMenu}
                            <ChevronDownIcon className="size-4 stroke-[0.8] text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => setActiveMenu("goal")}>Goal</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveMenu("journey")}>Journey</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {activeMenu === "journey" && userJourneyData.length > 0 && (
                    <>
                        <span className="text-muted-foreground text-sm">for</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-fit pr-2 font-semibold">
                                    {activeEvent.type}
                                    <ChevronDownIcon className="size-4 stroke-[0.8] text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {userJourneyData.map((data, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        onClick={() => setActiveEventIndex(index)}
                                    >
                                        {data.type}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </CardHeader>
            {userJourneyData.length ? (
                <>
                    <CardContent className={cn("relative", activeMenu === "goal" ? "px-0 pt-5" : "p-0")}>
                        {activeMenu === "goal" ? (
                            <DistributionChart
                                chartData={ensureExactLengthForChartData([...goalChartData])}
                                dataKey="type"
                            />
                        ) : (
                            <UsersJourneyTable
                                domain={domain}
                                activeEventVisitors={activeEvent.visitors}
                            />
                        )}
                    </CardContent>
                    {activeMenu === "goal" && (
                        <CardFooter className="justify-center">
                            <div
                                className="flex items-center gap-x-1 text-muted-foreground cursor-pointer hover:text-foreground"
                                onClick={() => open({ title: "Goal", chartData: goalChartData, dataKey: "type" })}
                            >
                                <ScanIcon className="size-4" />
                                <div className="text-xs font-semibold mt-0.5">DETAILS</div>
                            </div>
                        </CardFooter>
                    )}
                </>
            ) : (
                <CardContent className="relative h-[25.875rem]">
                    <div className="absolute inset-0 bg-logo-light opacity-[0.03] pointer-events-none dark:bg-logo-dark" />
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
            )}
        </Card>
    );
};

export default GoalsCard;