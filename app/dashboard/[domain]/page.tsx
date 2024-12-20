import WebsiteDetailsData from "./_components/WebsiteDetailsData";
import WebsiteDetailsHeader from "./_components/WebsiteDetailsHeader";
import AddGoalsCard from "@/features/websites/components/AddGoalsCard";

interface WebsiteDetailsPageProps {
    params: {
        domain: string;
    };
}

const WebsiteDetailsPage = ({
    params: { domain }
}: WebsiteDetailsPageProps) => {
    return (
        <div className="container pt-6 pb-12">
            <WebsiteDetailsHeader domain={domain} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <WebsiteDetailsData domain={domain} />
                <AddGoalsCard domain={domain} />
            </div>
        </div>
    );
};

export default WebsiteDetailsPage;