"use client";

import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const CallToAction = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    return (
        <section className="bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-primary to-blue-300 dark:to-blue-400 border-y-4 border-blue-400 dark:border-blue-500 rounded-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                        <div className="lg:self-center">
                            <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl">
                                <span className="block">Ready to dive in?</span>
                                <span className="block">Start your free trial today.</span>
                            </h2>
                            <p className="mt-4 text-base sm:text-xl lg:text-lg xl:text-xl leading-6 text-muted dark:text-zinc-200">
                                Unlock the power of data-driven decisions with our 14-day free trial. No credit card required.
                            </p>
                            <Button
                                size="lg"
                                className="bg-primary-foreground text-primary mt-8 hover:bg-primary-foreground/80"
                                onClick={() => router.push(
                                    isLoggedIn ? "/dashboard" : "/sign-in"
                                )}
                            >
                                {isLoggedIn ? "View dashboard" : "Start free trial"}
                            </Button>
                        </div>
                    </div>
                    <div className="relative -mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                        <Image
                            src="/images/visitor.png"
                            alt="Metrik visitors screenshot"
                            width={449}
                            height={251}
                            className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;