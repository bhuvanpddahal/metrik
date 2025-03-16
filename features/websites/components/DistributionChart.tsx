"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/Chart";
import { cn } from "@/lib/utils";
import type { ChartData } from "../types";

const chartConfig = {
    totalVisitors: {
        label: "Visitors",
        color: "hsl(var(--chart-3))"
    }
} satisfies ChartConfig;

interface DistributionChartProps {
    chartData: ChartData;
    dataKey: string;
    labelFormatter?: (value: string | null) => string;
    labelClassName?: string;
}

const DistributionChart = ({
    chartData,
    dataKey,
    labelFormatter,
    labelClassName = ""
}: DistributionChartProps) => {
    return (
        <ChartContainer config={chartConfig} className="h-[21rem] w-full">
            <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ left: 0, right: 40 }}
                barSize={30}
                barGap={2}
            >
                <YAxis
                    dataKey={dataKey}
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    hide
                />
                <XAxis dataKey="totalVisitors" type="number" hide />
                <ChartTooltip content={
                    <ChartTooltipContent
                        indicator="dot"
                        color="hsl(var(--primary))"
                        labelFormatter={labelFormatter}
                        labelClassName={labelClassName}
                    />
                } />
                <Bar
                    dataKey="totalVisitors"
                    layout="vertical"
                    fill="var(--color-totalVisitors)"
                    radius={[0, 4, 4, 0]}
                >
                    <LabelList
                        dataKey={dataKey}
                        position="insideLeft"
                        offset={18}
                        className={cn("fill-accent-foreground truncate", labelClassName)}
                        fontSize={14}
                        fontWeight={500}
                        formatter={labelFormatter}
                    />
                    <LabelList
                        dataKey="totalVisitors"
                        position="right"
                        offset={18}
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