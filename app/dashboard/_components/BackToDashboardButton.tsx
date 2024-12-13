import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button";

interface BackToDashboardButtonProps {
    btnText?: string;
}

const BackToDashboardButton = (
    { btnText = "Dashboard" }: BackToDashboardButtonProps
) => {
    return (
        <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline" })}
        >
            <ArrowLeftIcon className="size-3" />
            {btnText}
        </Link>
    );
};

export default BackToDashboardButton;