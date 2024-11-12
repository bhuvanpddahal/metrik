import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

const HeroSection = () => {
    return (
        <section className="pt-20 pb-56 relative bg-gradient-to-b from-blue-50 to-blue-300">
            <div className="container">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                            Unlocking the Power
                            <br />
                            of Your
                            <span className="text-primary"> Web Data</span>
                        </h1>
                        <p className="mt-3 text-base text-foreground text-balance sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                            Gain a deep understanding of your website&apos;s traffic, user behavior, and conversion rates. Track key metrics, identify trends, and optimize your online marketing efforts.
                        </p>
                        <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                            <Button size="xl">
                                Sign up for free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                        Hero Image
                    </div>
                </div>
            </div>
            <div
                className="absolute left-0 bottom-0 aspect-[2/1] w-full bg-waves bg-no-repeat bg-center bg-cover pointer-events-none"
            />
        </section>
    );
};

export default HeroSection;