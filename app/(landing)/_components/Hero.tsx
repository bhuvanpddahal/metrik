"use client";

import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

import Wave from "./Wave";
import { users } from "../constants";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const Hero = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    return (
        <section className="relative bg-blue-100 dark:bg-slate-900 pt-16 -mb-0.5 overflow-hidden">
            <div className="container lg:mb-12">
                <div className="relative lg:w-screen pt-5">
                    <div className="lg:max-w-lg w-full mb-8 lg:mb-0">
                        <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl text-center lg:text-left">
                            Powerful insights
                            <br />
                            <span className="text-primary dark:text-blue-400">for your website</span>
                        </h1>
                        <p className="mt-3 text-foreground text-balance sm:mt-5 text-base sm:text-xl lg:text-lg xl:text-xl text-center lg:text-left">
                            Unlock the full potential of your website with our advanced analytics platform. Make data-driven decisions and boost your online presence.
                        </p>
                        <div className="mt-8 text-center lg:text-left">
                            <Button
                                size="xl"
                                className="h-11 sm:h-12 pl-5 pr-4 sm:pl-8 sm:pr-7"
                                onClick={() => router.push(
                                    isLoggedIn ? "/dashboard" : "/sign-in"
                                )}
                            >
                                {isLoggedIn ? "Dashboard" : "Get Started"}
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center justify-center lg:justify-start">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {users.map((user, index) => (
                                        <Image
                                            key={index}
                                            src={user.avatar}
                                            alt={user.name}
                                            width={40}
                                            height={40}
                                            className="inline-block size-8 sm:size-10 rounded-full ring-2 ring-blue-100 dark:ring-blue-950"
                                        />
                                    ))}
                                </div>
                                <p className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Trusted by 1000+ happy users
                                </p>
                            </div>
                        </div>
                    </div>
                    <Image
                        src="/images/hero.svg"
                        alt="Metrik dashbaoard"
                        width={812}
                        height={489}
                        className="lg:absolute lg:top-0 lg:left-[34rem] h-auto lg:h-[calc(100%+10vw+3rem)] w-full lg:w-auto"
                        priority
                    />
                </div>
            </div>
            <Wave />
        </section>
    );
};

export default Hero;