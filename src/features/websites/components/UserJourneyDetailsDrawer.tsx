"use client";

import VisitorProfile from "./VisitorProfile";
import VisitorEventsTimeline from "./VisitorEventsTimeline";
import { Drawer, DrawerContent } from "@/components/ui/Drawer";
import { useUserJourneyDetailsDrawer } from "../hooks/useUserJourneyDetailsDrawer";

const UserJourneyDetailsDrawer = () => {
    const { isOpen, domain, visitor, close } = useUserJourneyDetailsDrawer();

    if (!domain || !visitor) return null;

    return (
        <Drawer open={isOpen} onOpenChange={close}>
            <DrawerContent className="max-h-screen gap-y-8 rounded-t-none md:rounded-t-3xl">
                <div className="flex-1 max-w-7xl w-full flex flex-col md:flex-row gap-x-12 gap-y-8 mx-auto md:px-8 md:pt-0 md:pb-16 overflow-y-auto">
                    <VisitorProfile visitor={visitor} />
                    <VisitorEventsTimeline
                        domain={domain}
                        journey={visitor.journey}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default UserJourneyDetailsDrawer;