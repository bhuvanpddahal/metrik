import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import { memo } from "react";
import { useTheme } from "next-themes";
import { scaleLinear } from "d3-scale";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/Tooltip";
import type { ChartData } from "../types";

interface WorldMapChartProps {
    chartData: ChartData;
}

const WorldMapChart = (
    { chartData }: WorldMapChartProps
) => {
    const totalVisitorsArray = chartData.map((data) => data.totalVisitors as number);
    const maxTotalVisitors = Math.max(...totalVisitorsArray, 1);
    const { resolvedTheme } = useTheme();

    const colorScale = scaleLinear(
        [0, maxTotalVisitors],
        resolvedTheme === "light" ? ["#eff6ff", "#bae6fd"] : ["#172554", "#1d4ed8"]
    );

    return (
        <TooltipProvider delayDuration={0}>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 140,
                    center: [0, 40]
                }}
                className="h-[23.375rem] w-full"
            >
                <Geographies geography="/data/countries.geo.json">
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const countryName = geo.properties.name;
                            const countryCode = geo.properties.ISO_A2;
                            const totalVisitors = chartData.find((row) => row.countryCode === countryCode)?.totalVisitors as number ?? 0;

                            return (
                                <Tooltip key={geo.rsmKey}>
                                    <TooltipTrigger asChild>
                                        <Geography
                                            geography={geo}
                                            style={{
                                                default: {
                                                    fill: colorScale(totalVisitors),
                                                    stroke: "hsl(var(--card))",
                                                    strokeWidth: 0.7,
                                                    outline: "none"
                                                },
                                                hover: {
                                                    fill: "hsl(var(--accent))",
                                                    stroke: "hsl(var(--card))",
                                                    outline: "none"
                                                },
                                                pressed: {
                                                    fill: "hsl(var(--muted))",
                                                    stroke: "hsl(var(--card))",
                                                    outline: "none"
                                                }
                                            }}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent className="min-w-[8rem] bg-background px-2.5 py-1.5 text-xs border border-border/50 rounded-lg shadow-xl">
                                        <p className="text-foreground font-medium">{countryName}</p>
                                        <div className="flex items-center gap-x-2 mt-1.5">
                                            <div className="size-2.5 bg-primary rounded-[2px]" />
                                            <div className="flex-1 flex items-center justify-between">
                                                <span className="text-muted-foreground">Visitors</span>
                                                <span className="font-mono font-medium tabular-nums text-foreground">
                                                    {totalVisitors}
                                                </span>
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </TooltipProvider>
    );
};

export default memo(WorldMapChart);