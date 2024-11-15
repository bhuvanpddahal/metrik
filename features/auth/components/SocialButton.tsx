"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "@hono/auth-js/react";

import { Button } from "@/components/ui/Button";

const SocialButton = () => {
    return (
        <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { redirectTo: "/dashboard" })}
        >
            <FcGoogle className="size-3" />
            Continue with Google
        </Button>
    );
};

export default SocialButton;