"use client";

import Code from "@/components/Code";
import { scriptSrc } from "../constants";
import { Button } from "@/components/ui/Button";
import { useVerifyScriptInstallation } from "../hooks/useVerifyScriptInstallation";

interface InstallScriptCardProps {
    websiteId: string;
    domain: string;
}

const InstallScriptCard = ({
    websiteId,
    domain
}: InstallScriptCardProps) => {
    const script =
        `<script defer data-website-id="${websiteId}" data-domain="${domain}" src="${scriptSrc}"></script>`;
    const { mutate: verifyInstallation, isPending } = useVerifyScriptInstallation();

    return (
        <div>
            <Code
                code={script}
                copySuccessText="Script copied"
                copyErrorText="Failed to copy script"
            />
            <Button
                className="w-full mt-6"
                onClick={() => verifyInstallation({ param: { websiteId } })}
                isLoading={isPending}
            >
                {isPending ? "Verifying installation" : "Verify installation"}
            </Button>
        </div>
    );
};

export default InstallScriptCard;