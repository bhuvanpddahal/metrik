"use client";

import Code from "@/components/Code";
import { scriptSrc } from "../constants";
import { Button } from "@/components/ui/Button";
import { useAddWebsiteSearchParams } from "../hooks/useAddWebsiteSearchParams";
import { useVerifyScriptInstallation } from "../hooks/useVerifyScriptInstallation";

const InstallScriptCard = () => {
    const { websiteId, domain } = useAddWebsiteSearchParams();
    const { mutate: verifyInstallation, isPending } = useVerifyScriptInstallation();

    const script = `<script
  defer
  data-website-id="${websiteId}"
  data-domain="${domain}"
  src="${scriptSrc}"
></script>`;

    return (
        <div>
            <Code
                code={script}
                language="htmlbars"
                copySuccessMessage="Script copied"
                copyErrorMessage="Failed to copy script"
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