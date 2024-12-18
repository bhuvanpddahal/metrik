import BackButton from "../../_components/BackButton";
import DeleteWebsiteModal from "@/features/websites/components/DeleteWebsiteModal";

interface WebsiteSettingsLayoutProps {
    params: { websiteId: string; };
    children: React.ReactNode;
}

const WebsiteSettingsLayout = ({
    params: { websiteId },
    children
}: WebsiteSettingsLayoutProps) => {
    return (
        <div className="container pt-6 pb-12">
            <BackButton href={`/dashboard/${websiteId}`} btnText="Back" className="mb-3" />
            {children}
            <DeleteWebsiteModal />
        </div>
    );
};

export default WebsiteSettingsLayout;