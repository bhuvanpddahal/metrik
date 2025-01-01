import { UserRoundPlusIcon } from "lucide-react";

import Code from "@/components/Code";
import SettingsCard from "./SettingsCard";
import { CardDescription, CardTitle } from "@/components/ui/Card";

const StandardGoals = () => {
    const script = 'window?.metrik("signup", { email: "user@mail.com" });';

    return (
        <div>
            <p className="text-sm text-muted-foreground">
                Standard goals are pre-defined goals that help you track the entire funnel from visitor to customer. Recommended for most websites. Add this code where the goal conversion occurs. Don&apos;t worry about duplicate conversions.
            </p>
            <SettingsCard
                cardClassName="mt-6"
                cardHeaderClassName="flex-row items-center gap-x-3"
                cardHeaderChildren={(
                    <>
                        <div className="shrink-0 size-11 bg-muted flex items-center justify-center border rounded-full">
                            <UserRoundPlusIcon className="size-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1.5">
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Someone created a new account
                            </CardDescription>
                        </div>
                    </>
                )}
            >
                <Code
                    code={script}
                    language="javascript"
                    copySuccessMessage="Script copied"
                    copyErrorMessage="Failed to copy script"
                />
            </SettingsCard>
        </div>
    );
};

export default StandardGoals;