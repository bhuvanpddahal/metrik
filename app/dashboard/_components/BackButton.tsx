import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button";

interface BackButtonProps {
    href: string;
    btnText: string;
    className?: string;
}

const BackButton = ({
    href,
    btnText,
    className = ""
}: BackButtonProps) => {
    return (
        <Link
            href={href}
            className={buttonVariants({ variant: "outline", className })}
        >
            <ArrowLeftIcon className="size-3 stroke-[0.8]" />
            {btnText}
        </Link>
    );
};

export default BackButton;