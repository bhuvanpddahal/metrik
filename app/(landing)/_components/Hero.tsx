import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Wave from "./Wave";
import { users } from "../constants";
import { Button } from "@/components/ui/Button";

const Hero = () => {
    return (
        <section className="pt-20 bg-blue-100 dark:bg-slate-900">
            <div className="container">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                            Powerful insights
                            <br />
                            <span className="text-primary">for your website</span>
                        </h1>
                        <p className="mt-3 text-base text-foreground text-balance sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                            Unlock the full potential of your website with our advanced analytics platform. Make data-driven decisions and boost your online presence.
                        </p>
                        <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                            <Button size="xl">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center justify-center lg:justify-start">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {users.map((user, index) => (
                                        <Image
                                            key={index}
                                            className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-100 dark:ring-blue-950"
                                            src={user.avatar}
                                            alt={user.name}
                                            width={40}
                                            height={40}
                                        />
                                    ))}
                                </div>
                                <p className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Trusted by 1000+ happy users
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                        Hero Image
                    </div>
                </div>
            </div>
            <Wave />
        </section>
    );
};

export default Hero;