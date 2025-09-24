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
import { Button } from "@/components/ui/Button";
import { ensureExactLengthForChartData, getDomainNameFromUrl } from "../utils";
import { useDistributionDetailsModal } from "../hooks/useDistributionDetailsModal";

interface ReferrerSitesCardProps {
    referrerChartData: ChartData;
}

const ReferrerSitesCard = ({
    referrerChartData
}: ReferrerSitesCardProps) => {
    const { open } = useDistributionDetailsModal();

    return (
        <Card>
            <CardHeader className="p-1 border-b">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2 font-semibold">
                            Referrer
                            <ChevronDownIcon className="size-4 stroke-[0.8] text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Referrer</DropdownMenuItem>
                        <DropdownMenuItem>Campaign</DropdownMenuItem>
                        <DropdownMenuItem>UTM</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="px-0 pt-5">
                <DistributionChart
                    chartData={ensureExactLengthForChartData(referrerChartData)}
                    dataKey="referrer"
                    labelFormatter={getDomainNameFromUrl}
                />
            </CardContent>
            <CardFooter className="justify-center">
                <div
                    className="flex items-center gap-x-1 text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => open({
                        title: "Referrer",
                        chartData: referrerChartData,
                        dataKey: "referrer",
                        labelFormatter: getDomainNameFromUrl
                    })}
                >
                    <ScanIcon className="size-4" />
                    <div className="text-xs font-semibold mt-0.5">DETAILS</div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ReferrerSitesCard;