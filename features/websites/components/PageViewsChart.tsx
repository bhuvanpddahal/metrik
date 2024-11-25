import { Line, LineChart } from "recharts";

import { ChartContainer, type ChartConfig } from "@/components/ui/Chart";

interface PageViewsChartProps {
    chartData?: {
        pageViews: number;
        date: string;
    }[];
}

const chartConfig = {
    pageViews: {
        color: "hsl(var(--chart-1))"
    }
} satisfies ChartConfig;

const PageViewsChart = (
    { chartData }: PageViewsChartProps
) => {
    return (
        <ChartContainer config={chartConfig} className="h-20 w-full pointer-events-none">
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12
                }}
            >
                <Line
                    dataKey="pageViews"
                    type="natural"
                    stroke="var(--color-pageViews)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    );
};

export default PageViewsChart;