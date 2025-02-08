import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/Accordion";
import { questions } from "../constants";

const FAQs = () => {
    return (
        <section id="faq" className="py-20 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
                        FAQs
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                        Frequently Asked Questions
                    </p>
                    <p className="mt-4 text-xl text-muted-foreground lg:text-center">
                        Find answers to common questions about Metrik here.
                    </p>
                </div>
                <div className="max-w-2xl w-full mx-auto mt-10">
                    <Accordion type="single" collapsible className="space-y-4">
                        {questions.map(({ question, answer }, index) => (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger>{question}</AccordionTrigger>
                                <AccordionContent>{answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQs;