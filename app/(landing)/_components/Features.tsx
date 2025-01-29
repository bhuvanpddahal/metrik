import { features } from "../constants";
import { Card } from "@/components/ui/Card";

const Features = () => {
    return (
        <section className="py-20 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
                        Features
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                        Everything you need to succeed online
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
                        Our web analytics platform provides you with all the tools you need to understand your audience and grow your online presence.
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <Card key={feature.name} className="relative group p-4 bg-muted shadow-sm">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white group-hover:bg-blue-6000 transition-colors duration-300">
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd>
                            </Card>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
};

export default Features;