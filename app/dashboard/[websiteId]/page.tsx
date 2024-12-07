import WebsiteDetailsTitle from "./_components/WebsiteDetailsTitle";
import AddGoalsCard from "@/features/websites/components/AddGoalsCard";
import WebsiteDetailsPageContent from "./_components/WebsiteDetailsPageData";

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
            <WebsiteDetailsTitle websiteId={websiteId} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <WebsiteDetailsPageContent websiteId={websiteId} />
                <AddGoalsCard websiteId={websiteId} />
            </div>
        </div>
    );
};

export default WebsiteDetailsPage;