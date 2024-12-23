"use client";

import { CopyIcon } from "lucide-react";

import { Button } from "./ui/Button";
import { copyToClipboard } from "@/lib/utils";

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
    return (
        <div className="relative bg-accent-foreground px-3.5 py-2 rounded-md dark:bg-accent">
            <code className="select-all font-mono text-accent text-xs font-semibold dark:text-accent-foreground">
                {code}
            </code>
            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-2 -translate-y-1/2"
                onClick={() => copyToClipboard(code, copySuccessMessage, copyErrorMessage)}
            >
                <CopyIcon className="size-4" />
            </Button>
        </div>
    );
};

export default Code;