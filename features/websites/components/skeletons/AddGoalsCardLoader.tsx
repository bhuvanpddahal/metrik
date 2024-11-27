import { ChevronDownIcon } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

const AddGoalsCardLoader = () => {
    return (
        <Card className="md:col-span-2 overflow-hidden">
            <CardHeader className="p-1 border-b">
                <Button variant="ghost" className="w-fit pr-2 font-semibold pointer-events-none">
                    Goal
                    <ChevronDownIcon className="size-4" />
                </Button>
            </CardHeader>
            <Skeleton className="h-96" />
        </Card >
    );
};

export default AddGoalsCardLoader;