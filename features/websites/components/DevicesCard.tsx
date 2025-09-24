import { useState } from "react";
import { ChevronDownIcon, ScanIcon } from "lucide-react";

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

interface DevicesCardProps {
    browserChartData: ChartData;
    operatingSystemChartData: ChartData;
    deviceChartData: ChartData;
}

const DevicesCard = ({
    browserChartData,
    operatingSystemChartData,
    deviceChartData
}: DevicesCardProps) => {
    const menu = new Map([
        ["browser", { label: "Browser", chartData: browserChartData }],
        ["operatingSystem", { label: "Operating System", chartData: operatingSystemChartData }],
        ["device", { label: "Device", chartData: deviceChartData }]
    ] as const);
    const { open } = useDistributionDetailsModal();

    type ActiveMenu = KeyOfMap<typeof menu>;

    const [activeMenu, setActiveMenu] = useState<ActiveMenu>("device");

    const label = menu.get(activeMenu)!.label;
    const chartData = menu.get(activeMenu)!.chartData;

    return (
        <Card>
            <CardHeader className="p-1 border-b">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2 font-semibold">
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
                <DistributionChart
                    chartData={ensureExactLengthForChartData(chartData)}
                    dataKey={activeMenu}
                    labelClassName="capitalize"
                />
            </CardContent>
            <CardFooter className="justify-center">
                <div
                    className="flex items-center gap-x-1 text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => open({
                        title: label,
                        chartData,
                        dataKey: activeMenu,
                        labelClassName: "capitalize"
                    })}
                >
                    <ScanIcon className="size-4" />
                    <div className="text-xs font-semibold mt-0.5">DETAILS</div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default DevicesCard;