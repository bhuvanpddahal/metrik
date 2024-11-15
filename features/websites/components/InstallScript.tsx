"use client";

import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

const InstallScript = () => {
    const script = `<script defer data-website-id="67348c26778d29d220359dba" data-domain="example.com" src="https://datafa.st/js/script.js"></script>`;

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
            <Button className="w-full mt-6">
                Verify installation
            </Button>
        </div>
    );
};

export default InstallScript;