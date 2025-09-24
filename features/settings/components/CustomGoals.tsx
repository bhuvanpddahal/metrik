import { CrosshairIcon } from "lucide-react";

import Code from "@/components/Code";
import SettingsCard from "@/features/settings/components/SettingsCard";
import { CardDescription, CardTitle } from "@/components/ui/Card";

const CustomGoals = () => {
    const windowInterface =
        `// Add this in your declaration (.d.ts) file
interface Window {
  metrik: (
    eventName: string,
    eventData: Record<string, any>
  ) => void;
}`;
    const metrikFunction = `window.metrik?.("goal_name", {
  description: "A short description of the event"
});`;

    return (
        <div>
            <p className="text-sm text-muted-foreground">
                Custom goals are goals that you can define yourself. Add this code where the goal conversion occurs. Don&apos;t worry about duplicate conversions.
            </p>
            <SettingsCard
                cardClassName="mt-6"
                cardHeaderClassName="flex-row items-center gap-x-3"
                cardHeaderChildren={(
                    <>
                        <div className="shrink-0 size-11 bg-muted flex items-center justify-center border rounded-full">
                            <CrosshairIcon className="size-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1.5">
                            <CardTitle>Custom goal</CardTitle>
                            <CardDescription>
                                Description is optional but recommended. We&apos;ll use it to provide AI-powered insights to help grow your startup.
                            </CardDescription>
                        </div>
                    </>
                )}
                cardContentClassName="space-y-5"
            >
                <Code
                    code={windowInterface}
                    language="typescript"
                    copySuccessMessage="Interface copied"
                    copyErrorMessage="Failed to copy interface"
                />
                <Code
                    code={metrikFunction}
                    language="javascript"
                    copySuccessMessage="Script copied"
                    copyErrorMessage="Failed to copy script"
                />
            </SettingsCard>
        </div>
    );
};

export default CustomGoals;