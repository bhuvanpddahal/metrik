"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/Form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/Select";
import { timezones } from "../constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAddWebsite } from "../hooks/useAddWebsite";
import { AddSitePayload, addSiteSchema } from "../schemas";

const WebsiteForm = () => {
    const { mutate: addWebsite, isPending } = useAddWebsite();

    const form = useForm<AddSitePayload>({
        resolver: zodResolver(addSiteSchema),
        defaultValues: { domain: "", timezone: "Etc/GMT+12" }
    });

    const onSubmit = (payload: AddSitePayload) => {
        addWebsite({ json: payload });
    };

    return (
        <Form {...form}>
            <form
                className="w-full space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Domain</FormLabel>
                            <div className="flex">
                                <div className="bg-muted flex items-center text-muted-foreground text-sm font-medium px-3 rounded-l-md border border-r-0">
                                    https://
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="example.com"
                                        className="rounded-l-none shadow-none"
                                        disabled={isPending}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isPending}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a timezone" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(timezones).map(([value, label]) => (
                                        <SelectItem key={value} value={value}>{label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This defines what "today" means in your reports
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isPending}
                >
                    {false ? "Adding website" : "Add website"}
                </Button>
            </form>
        </Form>
    );
};

export default WebsiteForm;