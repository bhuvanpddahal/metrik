"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
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
    labelClassName = "",
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
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            indicator="dot"
                            color="hsl(var(--primary))"
                            labelFormatter={labelFormatter}
                            labelClassName={labelClassName}
                        />
                    }
                />
                <Bar
                    dataKey="totalVisitors"
                    layout="vertical"
                    fill="var(--color-totalVisitors)"
                    radius={[0, 4, 4, 0]}
                >
                    <LabelList
                        dataKey={dataKey}
                        content={
                            <RowContent
                                chartData={chartData}
                                formatter={labelFormatter}
                                className={labelClassName}
                            />
                        }
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
};

export default DistributionChart;

const RowContent = ({
    y,
    height,
    value,
    index,
    chartData,
    formatter,
    className
}: any) => {
    const label = formatter ? formatter(value) : value;
    const count = chartData[index]?.totalVisitors;

    return (
        <foreignObject x={0} y={y} width="100%" height={height}>
            <div className="flex h-full w-full items-center justify-between px-4">
                <span className={cn("truncate text-sm text-foreground mr-4", className)}>
                    {label}
                </span>
                <span className="text-sm font-medium text-foreground">
                    {count}
                </span>
            </div>
        </foreignObject>
    );
};