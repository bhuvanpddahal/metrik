import { Skeleton } from "@/components/ui/Skeleton";

const UserAccountNavLoader = () => {
    return (
        <div className="h-9 flex items-center gap-x-2 px-4 py-2">
            <Skeleton className="size-8 bg-slate-50 rounded-full dark:bg-card" />
            <Skeleton className="h-3.5 w-24 bg-slate-50 rounded-sm dark:bg-card" />
        </div>
    );
};

export default UserAccountNavLoader;