import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis
} from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/Chart";

const chartData = [
    { month: "January", views: 80 },
    { month: "February", views: 200 },
    { month: "March", views: 120 },
    { month: "April", views: 190 },
    { month: "May", views: 130 },
    { month: "June", views: 140 }
];

const chartConfig = {
    views: {
        label: "Views",
        color: "hsl(var(--chart-1))"
    }
} satisfies ChartConfig;

const WebsiteOverviewChart = () => {
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
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                    <linearGradient id="fillviews" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-views)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-views)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <Area
                    dataKey="views"
                    type="natural"
                    fill="url(#fillviews)"
                    fillOpacity={0.4}
                    stroke="var(--color-views)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    );
};

export default WebsiteOverviewChart;