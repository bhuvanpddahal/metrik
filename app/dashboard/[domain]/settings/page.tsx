import WebsiteSettingsContent from "./_components/WebsiteSettingsContent";

interface WebsiteSettingsPageProps {
    params: {
        domain: string;
    };
}

const WebsiteSettingsPage = ({
    params: { domain }
}: WebsiteSettingsPageProps) => {
    return (
        <WebsiteSettingsContent domain={domain} />
    );
};

export default WebsiteSettingsPage;