import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface PingDotProps {
    color?: "primary" | "secondary";
    type?: "muted" | "active" | "checked";
}

const PingDot = ({
    color = "primary",
    type = "muted"
}: PingDotProps) => {
    const bgColor = color === "primary" ? "bg-primary" : "bg-secondary";

    return (
        <div className={cn(
            "relative size-2 bg-border flex items-center justify-center rounded-full",
            type !== "muted" && bgColor,
            type === "checked" && "size-3"
        )}>
            {type === "active" && (
                <span className={cn(
                    "shrink-0 size-3 bg-primary rounded-full animate-ping",
                    bgColor
                )} />
            )}
            {type === "checked" && (
                <CheckIcon className="size-2.5 text-background stroke-2" />
            )}
        </div>
    );
};

export default PingDot;