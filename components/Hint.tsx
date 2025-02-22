import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/Tooltip";

interface HintProps {
    side?: "top" | "bottom" | "left" | "right";
    message: string;
    children: React.ReactNode;
}

const Hint = ({
    side = "top",
    message,
    children
}: HintProps) => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side}>
                    <p>{message}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default Hint;