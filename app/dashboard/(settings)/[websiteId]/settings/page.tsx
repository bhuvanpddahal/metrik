import WebsiteSettingsContent from "./_components/WebsiteSettingsContent";

interface WebsiteSettingsPageProps {
    params: {
        websiteId: string;
    };
}

const WebsiteSettingsPage = ({
    params: { websiteId }
}: WebsiteSettingsPageProps) => {
    return (
        <WebsiteSettingsContent websiteId={websiteId} />
    );
};

export default WebsiteSettingsPage;