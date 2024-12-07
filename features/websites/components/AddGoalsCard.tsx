"use client";

import { ChevronDownIcon, PlusIcon } from "lucide-react";

import AddGoalsCardLoader from "./skeletons/AddGoalsCardLoader";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/Card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { useGetWebsiteData } from "../hooks/useGetWebsiteData";
import { useGetWebsiteDomain } from "../hooks/useGetWebsiteDomain";
import { useWebsiteDetailsSearchParams } from "../hooks/useWebsiteDetailsSearchParams";

interface AddGoalsCardProps {
    websiteId: string;
}

const AddGoalsCard = (
    { websiteId }: AddGoalsCardProps
) => {
    const { interval } = useWebsiteDetailsSearchParams();
    const { isError } = useGetWebsiteData(websiteId, interval);
    const { isInitialLoading } = useGetWebsiteDomain(websiteId);

    if (isInitialLoading) return <AddGoalsCardLoader />
    if (isError) return null;

    return (
        <Card className="md:col-span-2">
            <CardHeader className="p-1 border-b">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit pr-2 font-semibold">
                            Goal
                            <ChevronDownIcon className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Goal</DropdownMenuItem>
                        <DropdownMenuItem>Journey</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="h-96">
                <div className="h-full flex flex-col items-center justify-center gap-y-3">
                    <p className="font-semibold">
                        Track what visitors do on your site
                    </p>
                    <Button>
                        <PlusIcon className="size-3" />
                        Add goals
                    </Button>
                </div>
            </CardContent>
        </Card >
    );
};

export default AddGoalsCard;