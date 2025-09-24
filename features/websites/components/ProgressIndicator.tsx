import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
    color?: string;
    type?: "muted" | "active" | "checked";
}

const ProgressIndicator = ({
    color = "hsl(var(--primary))",
    type = "muted"
}: ProgressIndicatorProps) => {
    return (
        <div
            className={cn(
                "relative size-2 flex items-center justify-center rounded-full",
                type === "checked" && "size-3"
            )}
            style={{ backgroundColor: type !== "muted" ? color : "hsl(var(--border))" }}
        >
            {type === "active" && (
                <span
                    className="shrink-0 size-3 rounded-full animate-ping"
                    style={{ backgroundColor: color }}
                />
            )}
            {type === "checked" && (
                <CheckIcon className="size-2.5 text-background stroke-[4]" />
            )}
        </div>
    );
};

export default ProgressIndicator;