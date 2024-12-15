import GoalsNavContent from "./GoalsNavContent";
import GeneralNavContent from "./GeneralNavContent";
import ReportsNavContent from "./ReportsNavContent";
import { useWebsiteSettingsSearchParams } from "@/features/settings/hooks/useWebsiteSettingsSearchParams";

const NavContent = () => {
    const { tab } = useWebsiteSettingsSearchParams();

    switch (tab) {
        case "general":
            return <GeneralNavContent />
        case "goals":
            return <GoalsNavContent />
        case "reports":
            return <ReportsNavContent />
        default:
            return null;
    }
};

export default NavContent;