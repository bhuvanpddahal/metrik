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
import type { ChartData } from "../queries";
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
    const menu = {
        country: {
            label: "Country",
            chartData: countryChartData
        },
        map: {
            label: "Map",
            chartData: countryChartData
        },
        region: {
            label: "Region",
            chartData: regionChartData
        },
        city: {
            label: "City",
            chartData: cityChartData
        }
    } as const;
    const { open } = useDistributionDetailsModal();

    type ActiveMenu = keyof typeof menu;

    const [activeMenu, setActiveMenu] = useState<ActiveMenu>("country");

    const label = menu[activeMenu].label;
    const chartData = menu[activeMenu].chartData;

    return (
        <Card>
            <CardHeader className="p-1 border-b">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2 font-semibold">
                            {label}
                            <ChevronDownIcon className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {Object.entries(menu).map(([key, value]) => (
                            <DropdownMenuItem
                                key={key}
                                onClick={() => setActiveMenu(key as ActiveMenu)}
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
                        chartData={ensureExactLengthForChartData([...chartData])}
                        dataKey={activeMenu}
                    />
                )}
            </CardContent>
            {activeMenu !== "map" && (
                <CardFooter className="justify-center">
                    <div
                        className="flex items-center gap-x-1 text-muted-foreground cursor-pointer hover:text-foreground"
                        onClick={() => open({ title: label, data: chartData, dataKey: activeMenu })}
                    >
                        <ScanIcon className="size-4" />
                        <div className="text-xs font-semibold mt-0.5">DETAILS</div>
                    </div>
                </CardFooter>
            )}
        </Card >
    );
};

export default CountriesCard;