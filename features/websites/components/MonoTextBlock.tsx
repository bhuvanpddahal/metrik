import Hint from "@/components/Hint";
import { cn, copyToClipboard } from "@/lib/utils";

interface MonoTextBlockProps {
    text: string;
    className?: string;
    children: React.ReactNode;
}

const MonoTextBlock = ({
    text,
    className = "",
    children
}: MonoTextBlockProps) => {
    return (
        <Hint message="Click to copy">
            <div
                className={cn(
                    "bg-muted inline-flex items-center gap-x-1 text-muted-foreground text-sm font-mono px-1 mx-1 rounded-sm cursor-pointer",
                    className
                )}
                onClick={() => copyToClipboard(text)}
            >
                {children}
            </div>
        </Hint>
    );
};

export default MonoTextBlock;