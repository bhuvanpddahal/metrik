import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface SettingsCardProps {
    title?: string;
    description?: string;
    cardClassName?: string;
    cardHeaderClassName?: string;
    cardContentClassName?: string;
    cardHeaderChildren?: React.ReactNode;
    children: React.ReactNode;
}

const SettingsCard = ({
    title,
    description,
    cardClassName,
    cardHeaderClassName,
    cardContentClassName,
    cardHeaderChildren,
    children
}: SettingsCardProps) => {
    return (
        <Card className={cn("w-full", cardClassName)}>
            <CardHeader className={cn("border-b", cardHeaderClassName)}>
                {cardHeaderChildren ?? (
                    <>
                        <CardTitle>{title}</CardTitle>
                        {description && (
                            <CardDescription>{description}</CardDescription>
                        )}
                    </>
                )}
            </CardHeader>
            <CardContent className={cn("pt-5", cardContentClassName)}>
                {children}
            </CardContent>
        </Card>
    );
};

export default SettingsCard;