import { cn } from "@/lib/utils";

interface PerformanceIndicatorProps {
    changeInPercentage: number | null;
}

const PerformanceIndicator = (
    { changeInPercentage }: PerformanceIndicatorProps
) => {
    if (!changeInPercentage) return <div className="h-3" />

    const isPositive = changeInPercentage > 0;
    const isNegative = changeInPercentage < 0;
    const isZero = changeInPercentage === 0;

    return (
        <div className="h-3 overflow-y-hidden">
            <div className="flex items-center gap-x-1 -translate-y-full transition-transform group-hover:translate-y-0">
                <p className="text-muted-foreground text-xs font-medium">
                    {isPositive ? `+${changeInPercentage}%` : `${changeInPercentage}%`}
                </p>
                <div className={cn(
                    "shrink-0 size-1.5 mb-0.5 rounded-full",
                    {
                        "bg-emerald-500": isPositive,
                        "bg-destructive": isNegative,
                        "bg-yellow-500": isZero
                    }
                )} />
            </div>
        </div>
    );
};

export default PerformanceIndicator;