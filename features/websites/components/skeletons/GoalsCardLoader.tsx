import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card, CardHeader } from "@/components/ui/Card";

const GoalsCardLoader = () => {
    return (
        <Card className="md:col-span-2 overflow-hidden">
            <CardHeader className="p-1 border-b">
                <Button variant="ghost" className="w-fit pr-2 pointer-events-none">
                    Goal
                    <ChevronDownIcon className="size-4 stroke-[0.8] text-muted-foreground" />
                </Button>
            </CardHeader>
            <Skeleton className="h-[25.875rem] rounded-none" />
        </Card>
    );
};

export default GoalsCardLoader;