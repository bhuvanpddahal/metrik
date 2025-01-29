import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { steps } from "../constants";
import { AspectRatio } from "@/components/ui/AspectRatio";

const GetStarted = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Get Started in Two Easy Steps
                </h2>
                <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-muted p-1.5 border rounded-xl">
                            <Card className="relative h-full border-none rounded-lg shadow-sm overflow-hidden dark:bg-neutral-950">
                                <CardHeader className="p-0">
                                    <AspectRatio ratio={16 / 9}>
                                        <Image
                                            src={step.imageSrc}
                                            alt={step.imageAlt}
                                            width={100}
                                            height={100}
                                            className="size-full object-cover"
                                            priority
                                        />
                                    </AspectRatio>
                                    <div className="absolute top-0 left-0 bg-primary px-3 py-2 text-primary-foreground font-medium rounded-br-lg">
                                        #{index + 1}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8 space-y-2">
                                    <CardTitle className="text-lg font-bold tracking-normal">{step.title}</CardTitle>
                                    <CardDescription className="text-base">{step.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GetStarted;