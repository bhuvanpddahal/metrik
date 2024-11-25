"use client";

import { useRouter } from "next/navigation";
import { FaGlobeAmericas } from "react-icons/fa";

import PageViewsChart from "./PageViewsChart";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/Avatar";

interface WebsiteCardProps {
    id: string;
    domain: string;
    chartData?: {
        pageViews: number;
        date: string;
    }[];
    visitorsCount: number;
}

const WebsiteCard = ({
    id,
    domain,
    chartData,
    visitorsCount
}: WebsiteCardProps) => {
    const router = useRouter();

    return (
        <Card
            className="cursor-pointer hover:shadow-lg"
            onClick={() => router.push(`/dashboard/${id}`)}
        >
            <CardHeader className="flex-row gap-x-3 pb-3">
                <Avatar>
                    <AvatarImage src={`https://icons.duckduckgo.com/ip3/${domain}.ico`} />
                    <AvatarFallback>
                        <FaGlobeAmericas className="size-4 text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
                <CardTitle>{domain}</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
                <PageViewsChart chartData={chartData} />
            </CardContent>
            <CardFooter>
                <p><strong>{visitorsCount}</strong> {visitorsCount === 1 ? "visitor" : "visitors"}</p>
            </CardFooter>
        </Card>
    );
};

export default WebsiteCard;