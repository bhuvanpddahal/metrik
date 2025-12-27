import WebsiteSettingsContent from "./_components/WebsiteSettingsContent";

interface WebsiteSettingsPageProps {
    params: Promise<{
        domain: string;
    }>;
}

const WebsiteSettingsPage = async ({ params }: WebsiteSettingsPageProps) => {
    const { domain } = await params;

    return (
        <WebsiteSettingsContent domain={domain} />
    );
};

export default WebsiteSettingsPage;