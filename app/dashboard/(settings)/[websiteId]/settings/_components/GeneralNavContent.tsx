import { Button } from "@/components/ui/Button";
import DomainCard from "@/features/settings/components/DomainCard";
import ScriptCard from "@/features/settings/components/ScriptCard";
import TimezoneCard from "@/features/settings/components/TimezoneCard";

const GeneralNavContent = () => {
    return (
        <div className="max-w-[31.25rem] w-full space-y-4">
            <DomainCard />
            <TimezoneCard />
            <ScriptCard />
            <Button variant="destructive" className="flex ml-auto">
                Delete
            </Button>
        </div>
    );
};

export default GeneralNavContent;