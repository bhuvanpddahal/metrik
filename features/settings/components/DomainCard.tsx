import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SettingsCard from "./SettingsCard";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { type DomainPayload, domainSchema } from "../schemas";

const DomainCard = () => {
    const form = useForm<DomainPayload>({
        resolver: zodResolver(domainSchema),
        defaultValues: { domain: "" }
    });

    const onSubmit = () => { };

    return (
        <SettingsCard title="Domain">
            <Form {...form}>
                <form
                    className="w-full space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="domain"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="example.com"
                                        className="shadow-none"
                                    // disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="outline"
                        className="flex ml-auto shadow-none"
                    // isLoading={isPending}
                    >
                        Save
                    </Button>
                </form>
            </Form>
        </SettingsCard>
    );
};

export default DomainCard;