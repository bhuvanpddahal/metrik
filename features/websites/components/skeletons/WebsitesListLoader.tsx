import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

const WebsitesListLoader = () => {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }, (_, index) => (
                <Card key={index}>
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
            ))}
        </ul>
    );
};

export default WebsitesListLoader;