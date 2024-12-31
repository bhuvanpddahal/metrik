import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis
} from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/Chart";
import { OVERVIEW_CHART_INTERVALS } from "../constants";
import { getDateFormatterFromDateDiff } from "../utils";
import { useWebsiteDetailsSearchParams } from "../hooks/useWebsiteDetailsSearchParams";

interface WebsiteOverviewChartPorps {
    startDate: string;
    endDate: string;
    chartData: {
        date: string;
        totalVisitors: number;
    }[];
}

const chartConfig = {
    totalVisitors: {
        label: "Visitors",
        color: "hsl(var(--chart-1))"
    }
} satisfies ChartConfig;

const WebsiteOverviewChart = ({
    startDate,
    endDate,
    chartData
}: WebsiteOverviewChartPorps) => {
    const { interval } = useWebsiteDetailsSearchParams();

    let formatter = OVERVIEW_CHART_INTERVALS[interval].dateFormatter;

    if (interval === "allTime") {
        formatter = getDateFormatterFromDateDiff(startDate, endDate);
    }

    return (
        <ChartContainer config={chartConfig} className="h-96 w-full">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={formatter}
                />
                <YAxis
                    dataKey="totalVisitors"
                    type="number"
                    tickLine={false}
                    axisLine={{ strokeWidth: 0.15 }}
                    tickMargin={5}
                    width={20}
                    tickFormatter={(value) => Number.isInteger(value) ? value : ""}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent labelFormatter={formatter} />}
                />
                <defs>
                    <linearGradient id="fillviews" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-totalVisitors)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-totalVisitors)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <Area
                    dataKey="totalVisitors"
                    type="monotone"
                    fill="url(#fillviews)"
                    fillOpacity={0.4}
                    stroke="var(--color-totalVisitors)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    );
};

export default WebsiteOverviewChart;