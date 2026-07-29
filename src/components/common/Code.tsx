"use client";

import "highlight.js/styles/vs2015.css";
import hljs from "highlight.js";
import { useEffect } from "react";
import { CopyIcon } from "lucide-react";

import { Button } from "../ui/Button";
import { copyToClipboard } from "@/lib/utils";

interface CodeProps {
    code: string;
    language: string;
    copySuccessMessage?: string;
    copyErrorMessage?: string;
}

const Code = ({
    code,
    language,
    copySuccessMessage = "Code copied",
    copyErrorMessage = "Failed to copy code"
}: CodeProps) => {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <div className="relative bg-accent-foreground px-4 py-3.5 rounded-md dark:bg-accent">
            <pre className="text-xs">
                <code className={`language-${language} !bg-transparent !p-0`}>
                    {code}
                </code>
            </pre>
            <Button
                variant="outline"
                size="icon"
                className="size-8 absolute top-1/2 right-2 -translate-y-1/2 dark:border-card"
                onClick={() => copyToClipboard(code, copySuccessMessage, copyErrorMessage)}
            >
                <CopyIcon className="size-4" />
            </Button>
        </div>
    );
};

export default Code;