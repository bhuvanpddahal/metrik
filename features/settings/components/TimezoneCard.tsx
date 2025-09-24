import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SettingsCard from "./SettingsCard";
import timezones from "../../websites/timezones.json";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/Form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { type TimezonePayload, timezoneSchema } from "../schemas";
import { useUpdateTimezone } from "@/features/websites/hooks/useUpdateTimezone";

interface TimezoneCardProps {
    websiteId: string;
    timezone: string;
}

const TimezoneCard = ({
    websiteId,
    timezone
}: TimezoneCardProps) => {
    const { mutate: updateTimezone, isPending } = useUpdateTimezone();

    const form = useForm<TimezonePayload>({
        resolver: zodResolver(timezoneSchema),
        defaultValues: { timezone }
    });

    const onSubmit = (payload: TimezonePayload) => {
        updateTimezone({
            param: { websiteId },
            json: payload,
            currentTimezone: timezone
        });
    };

    return (
        <SettingsCard
            title="Timezone"
            description='This defines what "today" means in your reports'
        >
            <Form {...form}>
                <form
                    className="w-full space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isPending}
                                >
                                    <FormControl>
                                        <SelectTrigger className="shadow-none">
                                            <SelectValue placeholder="Select a timezone" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(timezones).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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

export default TimezoneCard;