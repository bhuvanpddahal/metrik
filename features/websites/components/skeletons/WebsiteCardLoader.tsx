import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

const WebsiteCardLoader = () => {
    return (
        <Card>
            <CardHeader className="flex-row gap-x-3 pb-3">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
            </CardHeader>
            <CardContent className="pb-3">
                <Skeleton className="h-20 w-full rounded-sm" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-4 w-16 my-1 rounded" />
            </CardFooter>
        </Card>
    );
};

export default WebsiteCardLoader;