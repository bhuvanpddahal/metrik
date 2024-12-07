import Link from "next/link";
import Image from "next/image";

import AuthForm from "./AuthForm";
import SocialButton from "./SocialButton";
import { Separator } from "@/components/ui/Separator";
import { buttonVariants } from "@/components/ui/Button";

const AuthContent = () => {
    return (
        <div className="min-w-96 space-y-8">
            <header>
                <Image
                    src="/icon.svg"
                    alt="Metrik Logo"
                    width={30}
                    height={30}
                    className="mx-auto"
                />
                <h1 className="mt-4 text-center text-3xl font-extrabold text-foreground">
                    Log in to Metrik
                </h1>
            </header>

            <AuthForm />

            <Separator className="flex items-center justify-center">
                <span className="px-2 bg-background text-muted-foreground text-sm">or</span>
            </Separator>

            <SocialButton />

            <p className="text-center text-muted-foreground text-sm">
                By signing up, you agree to our{" "}
                <Link
                    href="/terms"
                    className={buttonVariants({
                        variant: "link", className: "p-0 text-muted-foreground font-normal"
                    })}
                >
                    Terms of Service
                </Link>.
            </p>
        </div>
    );
};

export default AuthContent;