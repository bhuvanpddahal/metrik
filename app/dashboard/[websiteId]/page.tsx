import WebsiteDetailsData from "./_components/WebsiteDetailsData";
import WebsiteDetailsHeader from "./_components/WebsiteDetailsHeader";
import AddGoalsCard from "@/features/websites/components/AddGoalsCard";

interface WebsiteDetailsPageProps {
    params: {
        websiteId: string;
    };
}

const WebsiteDetailsPage = ({
    params: { websiteId }
}: WebsiteDetailsPageProps) => {
    return (
        <div className="container pt-6 pb-12">
            <WebsiteDetailsHeader websiteId={websiteId} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <WebsiteDetailsData websiteId={websiteId} />
                <AddGoalsCard websiteId={websiteId} />
            </div>
        </div>
    );
};

export default WebsiteDetailsPage;