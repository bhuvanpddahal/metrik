import { ChevronDownIcon, ScanIcon } from "lucide-react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

interface DistributionCardLoaderProps {
    name: string;
}

const DistributionCardLoader = (
    { name }: DistributionCardLoaderProps
) => {
    return (
        <Card>
            <CardHeader className="p-1 border-b">
                <Button variant="ghost" className="w-fit pr-2 font-semibold pointer-events-none">
                    {name}
                    <ChevronDownIcon className="size-4" />
                </Button>
            </CardHeader>
            <CardContent className="px-0 pt-5">
                <Skeleton className="h-[21rem] w-full" />
            </CardContent>
            <CardFooter className="justify-center">
                <div className="flex items-center gap-x-1 text-muted-foreground cursor-default">
                    <ScanIcon className="size-4" />
                    <div className="text-xs font-semibold mt-0.5">DETAILS</div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default DistributionCardLoader;