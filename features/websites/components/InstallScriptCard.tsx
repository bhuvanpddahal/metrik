"use client";

import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

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

    const handleCopy = () => {
        navigator.clipboard.writeText(script)
            .then(() => toast.success("Script copied"))
            .catch(() => toast.error("Failed to copy script"));
    };

    return (
        <div>
            <div className="relative bg-accent-foreground px-3.5 py-2 rounded-md">
                <code className="font-mono text-accent text-xs font-semibold">
                    {script}
                </code>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={handleCopy}
                >
                    <CopyIcon className="size-4" />
                </Button>
            </div>
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