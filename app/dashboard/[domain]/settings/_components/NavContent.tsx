import GoalsNavContent from "./GoalsNavContent";
import GeneralNavContent from "./GeneralNavContent";
import { useWebsiteSettingsSearchParams } from "@/features/settings/hooks/useWebsiteSettingsSearchParams";
import ReportsNavContent from "./ReportsNavContent";

interface NavContentProps {
    websiteId: string;
    domain: string;
    timezone: string;
}

const NavContent = ({
    websiteId,
    domain,
    timezone
}: NavContentProps) => {
    const { tab } = useWebsiteSettingsSearchParams();

    switch (tab) {
        case "general":
            return (
                <GeneralNavContent
                    websiteId={websiteId}
                    domain={domain}
                    timezone={timezone}
                />
            );
        case "goals":
            return <GoalsNavContent />
        case "reports":
            return <ReportsNavContent />
        default:
            return null;
    }
};

export default NavContent;