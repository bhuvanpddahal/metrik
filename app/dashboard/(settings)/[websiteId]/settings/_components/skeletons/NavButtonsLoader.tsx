import { cn } from "@/lib/utils";
import { navButtons } from "../../constants";
import { Skeleton } from "@/components/ui/Skeleton";
import { useWebsiteSettingsSearchParams } from "@/features/settings/hooks/useWebsiteSettingsSearchParams";

const NavButtonsLoader = () => {
    const { tab } = useWebsiteSettingsSearchParams();

    return (
        <div className="w-auto lg:w-52 space-x-2 lg:space-x-0 space-y-0 lg:space-y-2">
            {navButtons.map((navButton) => (
                <Skeleton className={cn(
                    "inline-block h-10 w-[6.8rem] lg:w-full",
                    tab === navButton.value ? "bg-secondary/50" : "bg-slate-50"
                )} />
            ))}
        </div>
    );
};

export default NavButtonsLoader;