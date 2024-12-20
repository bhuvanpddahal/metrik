import { UserRoundPlusIcon } from "lucide-react";

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
            <TabsList className="w-full cursor-not-allowed">
                <TabsTrigger value="standard" className="text-base pointer-events-none">Standard</TabsTrigger>
                <TabsTrigger value="custom" className="text-base pointer-events-none">Custom</TabsTrigger>
            </TabsList>
            <TabsContent value="standard">
                <div>
                    <div className="py-[0.1875rem] space-y-1.5">
                        <Skeleton className="h-3.5 w-full bg-slate-50 rounded-sm dark:bg-card" />
                        <Skeleton className="h-3.5 w-full bg-slate-50 rounded-sm dark:bg-card" />
                        <Skeleton className="h-3.5 max-w-[25.32rem] w-full bg-slate-50 rounded-sm dark:bg-card" />
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
                        <Skeleton className="h-10 w-full" />
                    </SettingsCard>
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default GoalsNavContentLoader;