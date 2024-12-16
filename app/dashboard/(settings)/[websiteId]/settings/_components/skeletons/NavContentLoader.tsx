import GoalsNavContentLoader from "./GoalsNavContentLoader";
import GeneralNavContentLoader from "./GeneralNavContentLoader";
import ReportsNavContentLoader from "./ReportsNavContentLoader";
import { useWebsiteSettingsSearchParams } from "@/features/settings/hooks/useWebsiteSettingsSearchParams";

const NavContentLoader = () => {
    const { tab } = useWebsiteSettingsSearchParams();

    switch (tab) {
        case "general":
            return <GeneralNavContentLoader />
        case "goals":
            return <GoalsNavContentLoader />
        case "reports":
            return <ReportsNavContentLoader />
        default:
            return null;
    }
};

export default NavContentLoader;