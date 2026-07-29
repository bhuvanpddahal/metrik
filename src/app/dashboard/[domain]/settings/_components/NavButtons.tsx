"use client";

import { navButtons } from "../constants";
import { Button } from "@/components/ui/Button";
import { useWebsiteSettingsSearchParams } from "@/features/settings/hooks/useWebsiteSettingsSearchParams";

const NavButtons = () => {
    const { tab, setTab } = useWebsiteSettingsSearchParams();

    return (
        <div className="sticky top-0 lg:top-10 w-auto lg:w-52 h-fit space-x-2 lg:space-x-0 space-y-0 lg:space-y-2">
            {navButtons.map((navButton) => (
                <Button
                    key={navButton.value}
                    variant={tab === navButton.value ? "secondary" : "ghost"}
                    size="lg"
                    className="w-fit lg:w-full justify-start text-base px-4 lg:px-8"
                    onClick={() => setTab(navButton.value)}
                >
                    <navButton.icon className="size-6" />
                    {navButton.label}
                </Button>
            ))}
        </div>
    );
};

export default NavButtons;