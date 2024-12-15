"use client";

import ThemeSwitcher from "@/features/settings/components/ThemeSwitcher";
import { useDashboardSettingsSearchParams } from "@/features/settings/hooks/useDashboardSettingsSearchParams";

const TabContent = () => {
    const { tab } = useDashboardSettingsSearchParams();

    switch (tab) {
        case "general":
            return <ThemeSwitcher />
        case "more":
            return (
                <div>
                    More tab
                </div>
            );
        default:
            return null;
    }
};

export default TabContent;