import NumberFlow, { NumberFlowGroup } from "@number-flow/react";

import ProgressIndicator from "./ProgressIndicator";
import PerformanceIndicator from "./PerformanceIndicator";
import WebsiteOverviewChart from "./WebsiteOverviewChart";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";

interface WebsiteOverviewCardProps {
    startDate: string;
    endDate: string;
    visitorsCount: number;
    visitorsCountChangeInPercentage: number | null;
    bounceRate: number;
    bounceRateChangeInPercentage: number | null;
    averageSessionTime: number;
    averageSessionTimeChangeInPercentage: number | null;
    liveVisitorsCount: number;
    overviewChartData: {
        date: string;
        totalVisitors: number;
    }[];
}

const WebsiteOverviewCard = ({
    startDate,
    endDate,
    visitorsCount,
    visitorsCountChangeInPercentage,
    bounceRate,
    bounceRateChangeInPercentage,
    averageSessionTime,
    averageSessionTimeChangeInPercentage,
    liveVisitorsCount,
    overviewChartData
}: WebsiteOverviewCardProps) => {
    return (
        <Card className="md:col-span-2">
            <ScrollArea className="max-w-full">
                <CardHeader className="group flex-row gap-x-6 pb-2">
                    <div className="shrink-0 space-y-2 mt-1.5">
                        <div className="text-sm text-muted-foreground font-medium">Visitors</div>
                        <div className="text-xl md:text-[1.65rem] font-bold">
                            <NumberFlow value={visitorsCount} />
                        </div>
                        <PerformanceIndicator changeInPercentage={visitorsCountChangeInPercentage} />
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Conversion rate</div>
                        <div className="text-xl md:text-[1.65rem] font-bold">-</div>
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Bounce rate</div>
                        <div className="text-xl md:text-[1.65rem] font-bold">
                            {bounceRate > 0 ? (
                                <NumberFlow
                                    value={bounceRate / 100}
                                    format={{ style: "percent", maximumFractionDigits: 2 }}
                                />
                            ) : "-"}
                        </div>
                        <PerformanceIndicator changeInPercentage={bounceRateChangeInPercentage} />
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Session time</div>
                        <div className="text-xl md:text-[1.65rem] font-bold">
                            {averageSessionTime > 0 ? (
                                <NumberFlowGroup>
                                    <NumberFlow value={Math.floor(averageSessionTime / 60)} />
                                    <span>m</span>{" "}
                                    <NumberFlow value={Math.floor(averageSessionTime % 60)} />
                                    <span>s</span>
                                </NumberFlowGroup>
                            ) : "-"}
                        </div>
                        <PerformanceIndicator changeInPercentage={averageSessionTimeChangeInPercentage} />
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="flex items-center gap-x-3 text-sm text-muted-foreground font-medium">
                            Visitors now
                            <ProgressIndicator type="active" color="#34d399" />
                        </div>
                        <div className="text-xl md:text-[1.65rem] font-bold">
                            <NumberFlow value={liveVisitorsCount} />
                        </div>
                    </div>
                </CardHeader>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <CardContent className="pt-2.5">
                <WebsiteOverviewChart
                    startDate={startDate}
                    endDate={endDate}
                    chartData={overviewChartData}
                />
            </CardContent>
        </Card>
    );
};

export default WebsiteOverviewCard;