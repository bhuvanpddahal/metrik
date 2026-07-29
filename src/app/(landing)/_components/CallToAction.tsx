"use client";

import { useRouter } from "nextjs-toploader/app";

import { Button } from "@/components/ui/Button";
import { DottedMap } from "@/components/common/DottedMap";
import { useAuth } from "@/features/auth/hooks/useAuth";

const CallToAction = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    return (
        <section className="bg-white dark:bg-neutral-950">
            <div className="relative max-w-7xl mx-auto bg-gradient-to-b from-primary to-background flex flex-col items-center px-6 lg:px-12 py-20 lg:py-24 rounded-t-3xl sm:rounded-t-[3rem] overflow-hidden">
                <DottedMap className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-transparent" />
                <h2 className="relative mb-3 text-3xl sm:text-4xl font-bold text-center text-primary-foreground text-shadow">
                    Ready to collect data?
                </h2>
                <p className="relative mb-6 text-center text-primary-foreground text-shadow">
                    Start collecting valuable insights for your website, now.
                </p>
                <Button
                    size="lg"
                    className="relative bg-primary-foreground text-primary hover:bg-primary-foreground/80"
                    onClick={() => router.push(
                        isLoggedIn ? "/dashboard" : "/sign-in"
                    )}
                >
                    {isLoggedIn ? "View dashboard" : "Start free trial"}
                </Button>
            </div>
        </section>
    );
};

export default CallToAction;