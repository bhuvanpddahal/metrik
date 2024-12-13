"use client";

import ThemeSwitcher from "@/features/settings/components/ThemeSwitcher";
import { useSettingsSearchParams } from "@/features/settings/hooks/useSettingsSearchParams";

const TabContent = () => {
    const { tab } = useSettingsSearchParams();

    if (tab === "general") return <ThemeSwitcher />

    return (
        <div>
            More tab
        </div>
    );
};

export default TabContent;