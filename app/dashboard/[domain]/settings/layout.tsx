import BackButton from "../../_components/BackButton";
import DeleteWebsiteModal from "@/features/websites/components/DeleteWebsiteModal";

interface WebsiteSettingsLayoutProps {
    params: { domain: string; };
    children: React.ReactNode;
}

const WebsiteSettingsLayout = ({
    params: { domain },
    children
}: WebsiteSettingsLayoutProps) => {
    return (
        <div className="container pt-6 pb-12">
            <BackButton href={`/dashboard/${domain}`} btnText="Back" className="mb-3" />
            {children}
            <DeleteWebsiteModal />
        </div>
    );
};

export default WebsiteSettingsLayout;