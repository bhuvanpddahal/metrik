import { Skeleton } from "@/components/ui/Skeleton";
import type { OverviewChartIntervalLabel } from "@/features/websites/constants";

interface WebsiteDetailsHeaderLoaderProps {
    domain: string;
    intervalLabel: OverviewChartIntervalLabel;
}

const WebsiteDetailsHeaderLoader = ({
    domain,
    intervalLabel
}: WebsiteDetailsHeaderLoaderProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
                <Skeleton className="h-9 bg-slate-50 text-transparent text-sm font-semibold tracking-tight px-[calc(2.25rem+1px)] pointer-events-none select-none dark:bg-card">
                    {domain}
                </Skeleton>
                <Skeleton className="h-9 bg-slate-50 text-transparent text-sm font-medium px-[calc(1.5rem+1px)] pointer-events-none select-none dark:bg-card">
                    {intervalLabel}
                </Skeleton>
            </div>
            <Skeleton className="size-9 bg-slate-50 dark:bg-card" />
        </div>
    );
};

export default WebsiteDetailsHeaderLoader;