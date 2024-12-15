import { CrosshairIcon, UserRoundPlusIcon } from "lucide-react";

import SettingsCard from "@/features/settings/components/SettingsCard";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/Tabs";
import { Skeleton } from "@/components/ui/Skeleton";
import { CardDescription, CardTitle } from "@/components/ui/Card";

const GoalsNavContentLoader = () => {
    return (
        <Tabs defaultValue="standard" className="max-w-[31.25rem] w-full">
            <TabsList className="w-full">
                <TabsTrigger value="standard" className="text-base">Standard</TabsTrigger>
                <TabsTrigger value="custom" className="text-base">Custom</TabsTrigger>
            </TabsList>
            <TabsContent value="standard">
                <div>
                    <div className="py-[0.1875rem] space-y-1.5">
                        <Skeleton className="h-3.5 w-full bg-slate-50 rounded-sm" />
                        <Skeleton className="h-3.5 w-full bg-slate-50 rounded-sm" />
                        <Skeleton className="h-3.5 max-w-[25.32rem] w-full bg-slate-50 rounded-sm" />
                    </div>
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
                        <Skeleton className="h-16 w-full" />
                    </SettingsCard>
                </div>
            </TabsContent>
            <TabsContent value="custom">
                <div>
                    <div className="py-[0.1875rem] space-y-1.5">
                        <Skeleton className="h-3.5 w-full bg-slate-50 rounded-sm" />
                        <Skeleton className="h-3.5 max-w-[25.32rem] w-full bg-slate-50 rounded-sm" />
                    </div>
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
                    >
                        <Skeleton className="h-16 w-full" />
                    </SettingsCard>
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default GoalsNavContentLoader;