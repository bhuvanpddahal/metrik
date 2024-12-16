import DeleteWebsiteModal from "@/features/websites/components/DeleteWebsiteModal";

interface WebsiteSettingsLayoutProps {
    children: React.ReactNode;
}

const WebsiteSettingsLayout = (
    { children }: WebsiteSettingsLayoutProps
) => {
    return (
        <>
            {children}
            <DeleteWebsiteModal />
        </>
    );
};

export default WebsiteSettingsLayout;