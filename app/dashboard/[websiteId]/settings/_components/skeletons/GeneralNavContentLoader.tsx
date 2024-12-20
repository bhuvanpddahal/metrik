import SettingsCard from "@/features/settings/components/SettingsCard";
import { Skeleton } from "@/components/ui/Skeleton";

const GeneralNavContentLoader = () => {
    return (
        <div className="max-w-[31.25rem] w-full space-y-4">
            <SettingsCard title="Domain">
                <div className="space-y-4">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-[4.04rem] ml-auto" />
                </div>
            </SettingsCard>
            <SettingsCard
                title="Timezone"
                description='This defines what "today" means in your reports'
            >
                <div className="space-y-4">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-[4.04rem] ml-auto" />
                </div>
            </SettingsCard>
            <SettingsCard
                title="Analytics script"
                description="Paste this snippet in the <head> of your website."
            >
                <Skeleton className="h-[5.5rem] w-full" />
            </SettingsCard>
            <Skeleton className="h-9 w-[4.576rem] bg-slate-50 ml-auto dark:bg-card" />
        </div>
    );
};

export default GeneralNavContentLoader;