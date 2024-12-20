import Code from "@/components/Code";
import SettingsCard from "./SettingsCard";
import { scriptSrc } from "@/features/websites/constants";

interface ScriptCardProps {
    websiteId: string;
    domain: string;
}

const ScriptCard = ({
    websiteId,
    domain
}: ScriptCardProps) => {
    const script =
        `<script defer data-website-id="${websiteId}" data-domain="${domain}" src="${scriptSrc}"></script>`;

    return (
        <SettingsCard
            title="Analytics script"
            description="Paste this snippet in the <head> of your website."
        >
            <Code
                code={script}
                copySuccessMessage="Script copied"
                copyErrorMessage="Failed to copy script"
            />
        </SettingsCard>
    );
};

export default ScriptCard;