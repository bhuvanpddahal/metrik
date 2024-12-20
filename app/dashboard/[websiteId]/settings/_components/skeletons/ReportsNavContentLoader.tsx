import SettingsCard from "@/features/settings/components/SettingsCard";
import { Skeleton } from "@/components/ui/Skeleton";

const ReportsNavContentLoader = () => {
    return (
        <div className="max-w-[31.25rem] w-full">
            <SettingsCard
                title="Weekly Email Reports"
                cardContentClassName="flex items-center justify-between gap-x-4"
            >
                <Skeleton className="h-3.5 w-[24.11rem] rounded-sm" />
                <Skeleton className="h-5 w-9 rounded-full" />
            </SettingsCard>
        </div>
    );
};

export default ReportsNavContentLoader;