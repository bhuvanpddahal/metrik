import SettingsCard from "@/features/settings/components/SettingsCard";
import { Switch } from "@/components/ui/Switch";

const ReportsNavContent = () => {
    return (
        <SettingsCard
            title="Weekly Email Reports"
            cardContentClassName="flex items-center justify-between gap-x-4"
        >
            <p className="text-sm text-muted-foreground">
                Receive weekly analytics reports with growth insights via email
            </p>
            <Switch className="shadow-none" />
        </SettingsCard>
    );
};

export default ReportsNavContent;