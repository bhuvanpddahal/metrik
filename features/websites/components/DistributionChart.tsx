"use client"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/Chart";

const chartData = [
    { page: "/", views: 305 },
    { page: "/dashboard", views: 237 },
    { page: "/signin", views: 228 },
    { page: "/settings", views: 214 },
    { page: "/support", views: 209 },
    { page: "/terms", views: 204 },
    { page: "/events", views: 186 },
    { page: "/goals", views: 73 },
    {}, {}
];

const chartConfig = {
    views: {
        label: "Views",
        color: "hsl(var(--chart-3))"
    },
    label: {
        color: "hsl(var(--card))"
    }
} satisfies ChartConfig;

const DistributionChart = () => {
    return (
        <ChartContainer config={chartConfig} className="h-[21rem] w-full">
            <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                    right: 0,
                    left: 0
                }}
            >
                <YAxis
                    dataKey="page"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                />
                <XAxis dataKey="views" type="number" hide />
                <ChartTooltip content={
                    <ChartTooltipContent
                        indicator="dot"
                        color="hsl(var(--primary))"
                    />
                } />
                <Bar
                    dataKey="views"
                    layout="vertical"
                    fill="var(--color-views)"
                    radius={[0, 4, 4, 0]}
                >
                    <LabelList
                        dataKey="page"
                        position="insideLeft"
                        offset={18}
                        className="fill-foreground"
                        fontSize={14}
                        fontWeight={500}
                    />
                    <LabelList
                        dataKey="views"
                        position="right"
                        offset={8}
                        className="fill-foreground"
                        fontSize={14}
                        fontWeight={600}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
};

export default DistributionChart;