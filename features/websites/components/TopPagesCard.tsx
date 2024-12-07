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
import type { ChartData } from "../queries";
import { Button } from "@/components/ui/Button";
import { useDistributionDetailsModal } from "../hooks/useDistributionDetailsModal";
import { ensureExactLengthForChartData, getPathnameAndSearchFromUrl } from "../utils";

interface TopPagesCardProps {
    pageChartData: ChartData
}

const TopPagesCard = ({
    pageChartData
}: TopPagesCardProps) => {
    const { open } = useDistributionDetailsModal();

    return (
        <Card>
            <CardHeader className="p-1 border-b">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2 font-semibold">
                            Page
                            <ChevronDownIcon className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Page</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="px-0 pt-5">
                <DistributionChart
                    chartData={ensureExactLengthForChartData([...pageChartData])}
                    dataKey="page"
                    labelFormatter={(value) => getPathnameAndSearchFromUrl(value)}
                />
            </CardContent>
            <CardFooter className="justify-center">
                <div
                    className="flex items-center gap-x-1 text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => open({ title: "Page", data: pageChartData, dataKey: "page" })}
                >
                    <ScanIcon className="size-4" />
                    <div className="text-xs font-semibold mt-0.5">DETAILS</div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default TopPagesCard;