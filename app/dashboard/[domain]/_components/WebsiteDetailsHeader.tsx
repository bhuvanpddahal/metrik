"use client";

import Link from "next/link";
import {
    ChevronDownIcon,
    SquareArrowOutUpRightIcon
} from "lucide-react";
import { useRouter } from "next/navigation";

import Hint from "@/components/Hint";
import WebsiteAvatar from "@/features/websites/components/WebsiteAvatar";
import WebsiteDetailsHeaderLoader from "./skeletons/WebsiteDetailsHeaderLoader";
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
import { useGetWebsiteHeader } from "@/features/websites/hooks/useGetWebsiteHeader";
import { useWebsiteDetailsSearchParams } from "@/features/websites/hooks/useWebsiteDetailsSearchParams";

interface WebsiteDetailsHeaderProps {
    domain: string;
}

const WebsiteDetailsHeader = (
    { domain }: WebsiteDetailsHeaderProps
) => {
    const router = useRouter();
    const { isLoading, data } = useGetWebsiteHeader(domain);
    const { interval, setInterval } = useWebsiteDetailsSearchParams();

    const activeIntervalLabel = OVERVIEW_CHART_INTERVALS[interval].label;

    if (isLoading) return (
        <WebsiteDetailsHeaderLoader
            domain={domain}
            intervalLabel={activeIntervalLabel}
        />
    );
    if (!data) return (
        <div className="h-9 text-center text-destructive font-medium">
            Failed to fetch website header
        </div>
    );

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="px-2">
                            <div className="flex items-center gap-x-2">
                                <WebsiteAvatar domain={domain} className="size-6 border-none" />
                                <p className="font-semibold leading-none tracking-tight">{domain}</p>
                            </div>
                            <ChevronDownIcon className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/${domain}/settings`)}>
                            Site settings
                        </DropdownMenuItem>
                        {data.otherWebsites.length > 0 && (
                            <>
                                <DropdownMenuSeparator />
                                {data.otherWebsites.map((website) => (
                                    <DropdownMenuItem
                                        key={website.id}
                                        onClick={() => router.push(`/dashboard/${website.domain}${interval !== "today" ? `?interval=${interval}` : ""}`)}
                                    >
                                        <WebsiteAvatar domain={website.domain} className="size-6 border-none" />
                                        {website.domain}
                                    </DropdownMenuItem>
                                ))}
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="pr-2">
                            {activeIntervalLabel}
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
                    href={`https://${domain}`}
                    target="_blank"
                    className={buttonVariants({ variant: "outline", size: "icon" })}
                >
                    <SquareArrowOutUpRightIcon className="size-4" />
                </Link>
            </Hint>
        </div>
    );
};

export default WebsiteDetailsHeader;