import WebsiteOverviewChart from "./WebsiteOverviewChart";
import PingDot from "@/features/websites/components/PingDot";
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
    overviewChartData: {
        pageViews: number;
        date: string;
    }[];
}

const WebsiteOverviewCard = ({
    startDate,
    endDate,
    visitorsCount,
    overviewChartData
}: WebsiteOverviewCardProps) => {
    return (
        <Card className="md:col-span-2">
            <ScrollArea className="max-w-full">
                <CardHeader className="flex-row gap-x-6 pb-4">
                    <div className="shrink-0 space-y-2 mt-1.5">
                        <div className="text-sm text-muted-foreground font-medium">Visitors</div>
                        <div className="text-xl md:text-[1.65rem] font-bold">{visitorsCount}</div>
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Conversion rate</div>
                        <div className="text-xl md:text-[1.65rem] font-bold">-</div>
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Bounce rate</div>
                        <div className="text-xl md:text-[1.65rem] font-bold">-</div>
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Session time</div>
                        <div className="text-xl md:text-[1.65rem] font-bold">1m 8s</div>
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="flex items-center gap-x-3 text-sm text-muted-foreground font-medium">
                            Visitors now
                            <PingDot type="active" color="#34d399" />
                        </div>
                        <div className="text-xl md:text-[1.65rem] font-bold">0</div>
                    </div>
                </CardHeader>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <CardContent className="pt-4">
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