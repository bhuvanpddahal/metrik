"use client";

import Link from "next/link";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { buttonVariants } from "@/components/ui/Button";

const NotFoundBackButton = () => {
    const { isLoggedIn } = useAuth();

    return (
        <Link
            href={isLoggedIn ? "/dashboard" : "/"}
            className={buttonVariants({
                variant: "outline",
                className: "mt-4"
            })}
        >
            {isLoggedIn ? "Go Back To Dashboard" : "Go Back To Home"}
        </Link>
    );
};

export default NotFoundBackButton;