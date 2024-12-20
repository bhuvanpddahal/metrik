"use client";

import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

import { Button } from "./ui/Button";

interface CodeProps {
    code: string;
    copySuccessMessage?: string;
    copyErrorMessage?: string;
}

const Code = ({
    code,
    copySuccessMessage = "Code copied",
    copyErrorMessage = "Failed to copy code"
}: CodeProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
            .then(() => toast.success(copySuccessMessage))
            .catch(() => toast.error(copyErrorMessage));
    };

    return (
        <div className="relative bg-accent-foreground px-3.5 py-2 rounded-md dark:bg-accent">
            <code className="select-all font-mono text-accent text-xs font-semibold dark:text-accent-foreground">
                {code}
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
    );
};

export default Code;