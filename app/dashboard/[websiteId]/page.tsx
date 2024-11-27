import WebsiteDetailsPageContent from "./_components/WebsiteDetailsPageContent";

interface WebsiteDetailsPageProps {
    params: {
        websiteId: string;
    };
}

const WebsiteDetailsPage = ({
    params: { websiteId }
}: WebsiteDetailsPageProps) => {
    return (
        <WebsiteDetailsPageContent websiteId={websiteId} />
    );
};

export default WebsiteDetailsPage;