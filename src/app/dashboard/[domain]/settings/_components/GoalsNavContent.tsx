import CustomGoals from "@/features/settings/components/CustomGoals";
import StandardGoals from "@/features/settings/components/StandardGoals";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/Tabs";

const GoalsNavContent = () => {
    return (
        <Tabs defaultValue="standard">
            <TabsList className="w-full">
                <TabsTrigger value="standard" className="text-base">Standard</TabsTrigger>
                <TabsTrigger value="custom" className="text-base">Custom</TabsTrigger>
            </TabsList>
            <TabsContent value="standard">
                <StandardGoals />
            </TabsContent>
            <TabsContent value="custom">
                <CustomGoals />
            </TabsContent>
        </Tabs>
    );
};

export default GoalsNavContent;