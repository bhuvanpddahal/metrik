import ProgressIndicator from "@/features/websites/components/ProgressIndicator";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Separator } from "@/components/ui/Separator";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";

const WebsiteOverviewCardLoader = () => {
    return (
        <Card className="md:col-span-2">
            <ScrollArea className="max-w-full">
                <CardHeader className="flex-row gap-x-6 pb-2">
                    <div className="shrink-0 space-y-2 mt-1.5">
                        <div className="text-sm text-muted-foreground">Visitors</div>
                        <div className="pb-1 md:pb-3">
                            <Skeleton className="h-7 w-10" />
                        </div>
                        <div className="h-3" />
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="text-sm text-muted-foreground">Conversion rate</div>
                        <Skeleton className="h-7 w-16" />
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="text-sm text-muted-foreground">Bounce rate</div>
                        <Skeleton className="h-7 w-16" />
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="text-sm text-muted-foreground">Session time</div>
                        <Skeleton className="h-7 w-[4.625rem]" />
                    </div>
                    <Separator orientation="vertical" className="shrink-0 min-h-14" />
                    <div className="shrink-0 space-y-2">
                        <div className="flex items-center gap-x-3 text-sm text-muted-foreground">
                            Visitors now
                            <ProgressIndicator type="active" color="#34d399" />
                        </div>
                        <Skeleton className="h-7 w-9" />
                    </div>
                </CardHeader>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <CardContent className="pt-2.5">
                <Skeleton className="h-96 w-full rounded-sm" />
            </CardContent>
        </Card>
    );
};

export default WebsiteOverviewCardLoader;