"use client";

import Link from "next/link";
import {
    ChevronDownIcon,
    SquareArrowOutUpRightIcon
} from "lucide-react";
import { useRouter } from "next/navigation";

import Hint from "@/components/Hint";
import WebsiteAvatar from "@/features/websites/components/WebsiteAvatar";
import WebsiteDetailsTitleLoader from "./skeletons/WebsiteDetailsTitleLoader";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import {
    MONTH_CHART_INTERVALS,
    NOW_CHART_INTERVALS,
    OVERVIEW_CHART_INTERVALS,
    type OverviewChartIntervalKey,
    WEEK_CHART_INTERVALS,
    YEAR_CHART_INTERVALS
} from "@/features/websites/constants";
import { Button, buttonVariants } from "@/components/ui/Button";
import { useGetWebsiteDomain } from "@/features/websites/hooks/useGetWebsiteDomain";
import { useWebsiteDetailsSearchParams } from "@/features/websites/hooks/useWebsiteDetailsSearchParams";

interface WebsiteDetailsTitleProps {
    websiteId: string;
}

const WebsiteDetailsTitle = (
    { websiteId }: WebsiteDetailsTitleProps
) => {
    const router = useRouter();
    const { isLoading, data } = useGetWebsiteDomain(websiteId);
    const { interval, setInterval } = useWebsiteDetailsSearchParams();

    if (isLoading) return <WebsiteDetailsTitleLoader />
    if (!data) return (
        <div className="h-9 text-center text-destructive font-medium">
            Failed to fetch website domain
        </div>
    );

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="px-2">
                            <div className="flex items-center gap-x-2">
                                <WebsiteAvatar domain={data.domain} className="size-6 border-none" />
                                <p className="font-semibold leading-none tracking-tight">{data.domain}</p>
                            </div>
                            <ChevronDownIcon className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/${websiteId}/settings`)}>
                            Site settings
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="pr-2">
                            {OVERVIEW_CHART_INTERVALS[interval].label}
                            <ChevronDownIcon className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {Object.entries(NOW_CHART_INTERVALS).map(([key, value]) => (
                            <DropdownMenuItem
                                key={key}
                                onClick={() => setInterval(key as OverviewChartIntervalKey)}
                            >
                                {value.label}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        {Object.entries(WEEK_CHART_INTERVALS).map(([key, value]) => (
                            <DropdownMenuItem
                                key={key}
                                onClick={() => setInterval(key as OverviewChartIntervalKey)}
                            >
                                {value.label}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        {Object.entries(MONTH_CHART_INTERVALS).map(([key, value]) => (
                            <DropdownMenuItem
                                key={key}
                                onClick={() => setInterval(key as OverviewChartIntervalKey)}
                            >
                                {value.label}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        {Object.entries(YEAR_CHART_INTERVALS).map(([key, value]) => (
                            <DropdownMenuItem
                                key={key}
                                onClick={() => setInterval(key as OverviewChartIntervalKey)}
                            >
                                {value.label}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setInterval("allTime")}>
                            All Time
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Hint message="View the live website">
                <Link
                    href={`https://${data.domain}`}
                    target="_blank"
                    className={buttonVariants({ variant: "outline", size: "icon" })}
                >
                    <SquareArrowOutUpRightIcon className="size-4" />
                </Link>
            </Hint>
        </div>
    );
};

export default WebsiteDetailsTitle;