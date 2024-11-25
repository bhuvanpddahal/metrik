import WebsiteCard from "./WebsiteCard";

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
    return (
        <ul className="grid grid-cols-3 gap-6 mt-6">
            {websites.map((website) => (
                <WebsiteCard
                    key={website.id}
                    id={website.id}
                    domain={website.domain}
                    chartData={website.chartData}
                    visitorsCount={website.visitorsCount}
                />
            ))}
        </ul>
    );
};

export default WebsitesList;