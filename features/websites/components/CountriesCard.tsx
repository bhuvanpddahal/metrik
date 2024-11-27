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
import { Button } from "@/components/ui/Button";

const CountriesCard = () => {
    return (
        <Card>
            <CardHeader className="p-1 border-b">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2 font-semibold">
                            Country
                            <ChevronDownIcon className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Map</DropdownMenuItem>
                        <DropdownMenuItem>Country</DropdownMenuItem>
                        <DropdownMenuItem>Region</DropdownMenuItem>
                        <DropdownMenuItem>City</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="px-0 pt-5">
                <DistributionChart />
            </CardContent>
            <CardFooter className="justify-center">
                <div className="flex items-center gap-x-1 text-muted-foreground cursor-pointer hover:text-foreground">
                    <ScanIcon className="size-4" />
                    <div className="text-xs font-semibold mt-0.5">DETAILS</div>
                </div>
            </CardFooter>
        </Card >
    );
};

export default CountriesCard;