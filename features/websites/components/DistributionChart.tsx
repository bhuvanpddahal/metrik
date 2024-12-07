"use client"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/Chart";

const chartConfig = {
    totalVisitors: {
        label: "Visitors",
        color: "hsl(var(--chart-3))"
    }
} satisfies ChartConfig;

interface DistributionChartProps {
    chartData: { [x: string]: string | number | null; }[];
    dataKey: string;
    labelFormatter?: (value: string | null) => string;
}

const DistributionChart = ({
    chartData,
    dataKey,
    labelFormatter
}: DistributionChartProps) => {
    return (
        <ChartContainer config={chartConfig} className="h-[21rem] w-full">
            <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                    right: 40,
                    left: 0
                }}
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
                        className="fill-foreground truncate"
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