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
                            <span className="text-blue-500"> Web Data</span>
                        </h1>
                        <p className="mt-3 text-base text-foreground text-balance sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                            Gain a deep understanding of your website&apos;s traffic, user behavior, and conversion rates. Track key metrics, identify trends, and optimize your online marketing efforts.
                        </p>
                        <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                            <a
                                href="https://vercel.com/templates/next.js/next-js-saas-starter"
                                target="_blank"
                            >
                                <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                                    Deploy your own
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                        Hero Image
                    </div>
                </div>
            </div>
            {/* <div className="absolute left-0 bottom-0 w-full h-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff" fillOpacity="1" d="M0,160L48,154.7C96,149,192,139,288,160C384,181,480,235,576,256C672,277,768,267,864,245.3C960,224,1056,192,1152,192C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width={900} height={450} className="w-full">
                    <path
                        fill="#fff"
                        fillOpacity={0.5}
                        d="m0 335 21.5 8.2c21.5 8.1 64.5 24.5 107.3 24 42.9-.5 85.5-17.9 128.4-28C300 329 343 326 385.8 331.5c42.9 5.5 85.5 19.5 128.4 27.7 42.8 8.1 85.8 10.5 128.6 8.5 42.9-2 85.5-8.4 128.4-9.9 42.8-1.5 85.8 1.9 107.3 3.5L900 363v88H0Z"
                    />
                    <path
                        fill="#fff"
                        d="m0 383 21.5 4c21.5 4 64.5 12 107.3 16.7 42.9 4.6 85.5 6 128.4-4.7 42.8-10.7 85.8-33.3 128.6-38 42.9-4.7 85.5 8.7 128.4 12.3 42.8 3.7 85.8-2.3 128.6-1 42.9 1.4 85.5 10 128.4 8.5 42.8-1.5 85.8-13.1 107.3-19L900 356v95H0Z"
                    />
                </svg>
            </div> */}
            <div
                className="absolute left-0 bottom-0 aspect-[2/1] w-full bg-waves bg-no-repeat bg-center bg-cover pointer-events-none"
            />
        </section>
    );
};

export default HeroSection;