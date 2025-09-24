import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SettingsCard from "@/features/settings/components/SettingsCard";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useUpdateDomain } from "@/features/websites/hooks/useUpdateDomain";
import { type DomainPayload, domainSchema } from "@/features/settings/schemas";

interface DomainCardProps {
    websiteId: string;
    domain: string;
}

const DomainCard = ({
    websiteId,
    domain
}: DomainCardProps) => {
    const { mutate: updateDomain, isPending } = useUpdateDomain();

    const form = useForm<DomainPayload>({
        resolver: zodResolver(domainSchema),
        defaultValues: { domain }
    });

    const onSubmit = (payload: DomainPayload) => {
        updateDomain({
            param: { websiteId },
            json: payload,
            currentDomain: domain
        });
    };

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
                    <Button
                        type="submit"
                        variant="outline"
                        className="flex ml-auto shadow-none"
                        isLoading={isPending}
                    >
                        {isPending ? "Saving" : "Save"}
                    </Button>
                </form>
            </Form>
        </SettingsCard>
    );
};

export default DomainCard;