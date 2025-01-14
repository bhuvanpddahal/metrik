import VerifyWebsiteAlert from "./VerifyWebsiteAlert";
import DomainCard from "@/features/settings/components/DomainCard";
import ScriptCard from "@/features/settings/components/ScriptCard";
import TimezoneCard from "@/features/settings/components/TimezoneCard";
import { Button } from "@/components/ui/Button";
import { useDeleteWebsiteModal } from "@/features/websites/hooks/useDeleteWebsiteModal";

interface GeneralNavContentProps {
    websiteId: string;
    domain: string;
    timezone: string;
}

const GeneralNavContent = ({
    websiteId,
    domain,
    timezone
}: GeneralNavContentProps) => {
    const { open } = useDeleteWebsiteModal();

    return (
        <>
            <DomainCard websiteId={websiteId} domain={domain} />
            <TimezoneCard websiteId={websiteId} timezone={timezone} />
            <ScriptCard websiteId={websiteId} domain={domain} />
            <Button
                variant="destructive"
                className="flex ml-auto"
                onClick={() => open(websiteId)}
            >
                Delete
            </Button>
        </>
    );
};

export default GeneralNavContent;