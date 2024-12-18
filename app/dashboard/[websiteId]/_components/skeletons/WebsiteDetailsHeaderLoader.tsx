import { Skeleton } from "@/components/ui/Skeleton";

const WebsiteDetailsHeaderLoader = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
                <Skeleton className="h-9 w-[10.35rem] bg-slate-50" />
                <Skeleton className="h-9 w-[5.49rem] bg-slate-50" />
            </div>
            <Skeleton className="size-9 bg-slate-50" />
        </div>
    );
};

export default WebsiteDetailsHeaderLoader;