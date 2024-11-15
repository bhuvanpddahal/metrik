import { cn } from "@/lib/utils";

interface PingDotProps {
    color?: "primary" | "secondary";
    ping?: boolean;
}

const PingDot = ({
    color = "primary",
    ping = false
}: PingDotProps) => {
    const bgColor = color === "primary" ? "bg-primary" : "bg-secondary";

    return (
        <div className={cn(
            "relative h-2 w-2 bg-border flex items-center justify-center rounded-full",
            ping && bgColor
        )}>
            {ping && (
                <span className={cn(
                    "shrink-0 size-3 bg-primary rounded-full animate-ping",
                    bgColor
                )} />
            )}
        </div>
    );
};

export default PingDot;