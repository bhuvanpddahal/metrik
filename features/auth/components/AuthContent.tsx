import Link from "next/link";
import Image from "next/image";

import AuthForm from "./AuthForm";
import SocialButton from "./SocialButton";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { buttonVariants } from "@/components/ui/Button";

const AuthContent = () => {
    return (
        <Card className="w-96 shadow-rose-50 shadow-2xl dark:shadow-orange-950/15">
            <CardHeader className="sm:p-8">
                <Image
                    src="/images/icon.svg"
                    alt="Metrik Logo"
                    width={24}
                    height={24}
                    className="mx-auto"
                    priority
                />
                <CardTitle className="text-center mt-1">Log in to Metrik</CardTitle>
            </CardHeader>
            <CardContent className="sm:px-8 sm:pb-8 space-y-5 sm:space-y-8">
                <AuthForm />
                <Separator className="flex items-center justify-center">
                    <span className="px-2 bg-card text-muted-foreground text-sm">or</span>
                </Separator>
                <SocialButton />
            </CardContent>
            <CardFooter className="sm:px-8 sm:pb-8">
                <p className="text-center text-muted-foreground text-sm">
                    By signing up, you agree to our{" "}
                    <Link
                        href="/terms"
                        className={buttonVariants({
                            variant: "link", className: "!px-0 text-muted-foreground font-normal"
                        })}
                    >
                        Terms of Service
                    </Link>.
                </p>
            </CardFooter>
        </Card>
    );
};

export default AuthContent;