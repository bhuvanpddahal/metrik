"use client";

import { Button } from "@/components/ui/Button";
import { navButtons } from "@/app/dashboard/settings/constants";
import { useDashboardSettingsSearchParams } from "@/features/settings/hooks/useDashboardSettingsSearchParams";

const NavButtons = () => {
    const { tab, setTab } = useDashboardSettingsSearchParams();

    return (
        <div className="w-auto lg:w-52 space-x-2 lg:space-x-0 space-y-0 lg:space-y-2">
            {navButtons.map((navButton) => (
                <Button
                    key={navButton.value}
                    variant={tab === navButton.value ? "secondary" : "ghost"}
                    size="lg"
                    className="w-fit lg:w-full justify-start text-base px-4 lg:px-8"
                    onClick={() => setTab(navButton.value)}
                >
                    {navButton.label}
                </Button>
            ))}
        </div>
    );
};

export default NavButtons;