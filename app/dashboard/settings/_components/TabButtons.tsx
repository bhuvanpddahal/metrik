"use client";

import { Button } from "@/components/ui/Button";
import { useSettingsSearchParams } from "@/features/settings/hooks/useSettingsSearchParams";

const tabButtons = [
    {
        label: "General",
        value: "general"
    },
    {
        label: "More",
        value: "more"
    }
] as const;

const TabButtons = () => {
    const { tab, setTab } = useSettingsSearchParams();

    return (
        <div className="w-auto lg:w-52 space-x-2 lg:space-x-0 space-y-0 lg:space-y-2">
            {tabButtons.map((tabButton) => (
                <Button
                    variant={tab === tabButton.value ? "secondary" : "ghost"}
                    size="lg"
                    className="w-fit lg:w-full justify-start text-base px-4 lg:px-8"
                    onClick={() => setTab(tabButton.value)}
                >
                    {tabButton.label}
                </Button>
            ))}
        </div>
    );
};

export default TabButtons;