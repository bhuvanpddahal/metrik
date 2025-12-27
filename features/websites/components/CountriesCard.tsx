import { useState } from "react";
import { ChevronDownIcon, ScanIcon } from "lucide-react";

import WorldMapChart from "./WorldMapChart";
import DistributionChart from "./DistributionChart";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/Card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import type { ChartData } from "../types";
import type { KeyOfMap } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ensureExactLengthForChartData } from "../utils";
import { useDistributionDetailsModal } from "../hooks/useDistributionDetailsModal";

interface CountriesCardProps {
    countryChartData: ChartData;
    regionChartData: ChartData;
    cityChartData: ChartData;
}

const CountriesCard = ({
    countryChartData,
    regionChartData,
    cityChartData
}: CountriesCardProps) => {
    const menu = new Map([
        ["country", { label: "Country", chartData: countryChartData }],
        ["map", { label: "Map", chartData: countryChartData }],
        ["region", { label: "Region", chartData: regionChartData }],
        ["city", { label: "City", chartData: cityChartData }]
    ] as const);
    const { open } = useDistributionDetailsModal();

    type ActiveMenu = KeyOfMap<typeof menu>;

    const [activeMenu, setActiveMenu] = useState<ActiveMenu>("country");

    const label = menu.get(activeMenu)!.label;
    const chartData = menu.get(activeMenu)!.chartData;

    return (
        <Card>
            <CardHeader className="p-1 border-b">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2">
                            {label}
                            <ChevronDownIcon className="size-4 stroke-[0.8] text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {[...menu.entries()].map(([key, value]) => (
                            <DropdownMenuItem
                                key={key}
                                onClick={() => setActiveMenu(key)}
                            >
                                {value.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="px-0 pt-5">
                {activeMenu === "map" ? (
                    <WorldMapChart chartData={chartData} />
                ) : (
                    <DistributionChart
                        chartData={ensureExactLengthForChartData(chartData)}
                        dataKey={activeMenu}
                    />
                )}
            </CardContent>
            {activeMenu !== "map" && (
                <CardFooter className="justify-center">
                    <div
                        className="flex items-center gap-x-1 text-muted-foreground cursor-pointer hover:text-foreground"
                        onClick={() => open({ title: label, chartData, dataKey: activeMenu })}
                    >
                        <ScanIcon className="size-4" />
                        <div className="text-xs">DETAILS</div>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

export default CountriesCard;