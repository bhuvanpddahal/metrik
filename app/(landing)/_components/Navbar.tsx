"use client";

import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const Navbar = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    return (
        <header className="bg-blue-100 dark:bg-slate-900">
            <nav className="container py-4 flex justify-between items-center">
                <Link href="/">
                    <Logo />
                </Link>
                <div className="flex items-center space-x-8">
                    <Link
                        href="/#faq"
                        className="text-sm font-medium text-muted-foreground hover:text-accent-foreground hover:underline"
                    >
                        FAQs
                    </Link>
                    <Button
                        variant="secondary"
                        onClick={() => router.push(
                            isLoggedIn ? "/dashboard" : "/sign-in"
                        )}
                    >
                        {isLoggedIn ? "Dashboard" : "Sign In"}
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;