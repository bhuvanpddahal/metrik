import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button";

interface BackToDashboardButtonProps {
    btnText?: string;
    className?: string;
}

const BackToDashboardButton = ({
    btnText = "Dashboard",
    className = ""
}: BackToDashboardButtonProps) => {
    return (
        <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline", className })}
        >
            <ArrowLeftIcon className="size-3" />
            {btnText}
        </Link>
    );
};

export default BackToDashboardButton;