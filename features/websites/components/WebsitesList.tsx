import { useRouter } from "nextjs-toploader/app";

import WebsiteAvatar from "./WebsiteAvatar";
import PageViewsChart from "./PageViewsChart";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";

interface WebsitesListProps {
    websites: {
        id: string;
        domain: string;
        chartData?: {
            pageViews: number;
            date: string;
        }[];
        visitorsCount: number;
    }[];
}

const WebsitesList = (
    { websites }: WebsitesListProps
) => {
    const router = useRouter();

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {websites.map((website) => (
                <Card
                    key={website.id}
                    className="cursor-pointer hover:shadow-lg"
                    onClick={() => router.push(`/dashboard/${website.domain}`)}
                >
                    <CardHeader className="flex-row gap-x-3 pb-3">
                        <WebsiteAvatar domain={website.domain} />
                        <CardTitle>{website.domain}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                        <PageViewsChart chartData={website.chartData} />
                    </CardContent>
                    <CardFooter>
                        <p><strong>{website.visitorsCount}</strong> {website.visitorsCount === 1 ? "visitor" : "visitors"}</p>
                    </CardFooter>
                </Card>
            ))}
        </ul>
    );
};

export default WebsitesList;