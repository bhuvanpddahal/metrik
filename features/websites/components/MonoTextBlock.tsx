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
            <span
                className={cn(
                    "bg-muted inline-flex items-center gap-x-1 align-middle text-muted-foreground text-sm font-dm-mono font-normal px-1 mx-1 rounded-sm cursor-pointer",
                    className
                )}
                onClick={() => copyToClipboard(text)}
            >
                {children}
            </span>
        </Hint>
    );
};

export default MonoTextBlock;