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
import type { ChartData } from "../queries";
import { ensureExactLengthForChartData } from "../utils";
import { Button, buttonVariants } from "@/components/ui/Button";
import { useDistributionDetailsModal } from "../hooks/useDistributionDetailsModal";

interface GoalsCardProps {
    goalChartData: ChartData;
}

const GoalsCard = ({
    goalChartData
}: GoalsCardProps) => {
    const { open } = useDistributionDetailsModal();
    const [activeMenu, setActiveMenu] = useState<"goal" | "journey">("goal");

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
                {activeMenu === "journey" && (
                    <>
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
                    </>
                )}
            </CardHeader>
            <CardContent className={cn("relative", activeMenu === "goal" ? "px-0 pt-5" : "p-0")}>
                {activeMenu === "goal" ? (
                    <DistributionChart
                        chartData={ensureExactLengthForChartData([...goalChartData])}
                        dataKey="type"
                    />
                ) : (
                    <UsersJourneyTable />
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
        </Card >
    );
};

export default GoalsCard;