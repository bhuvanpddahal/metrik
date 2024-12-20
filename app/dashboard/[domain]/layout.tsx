import DistributionDetailsModal from "@/features/websites/components/DistributionDetailsModal";

interface WebsiteDetailsLayoutProps {
    children: React.ReactNode;
}

const WebsiteDetailsLayout = (
    { children }: WebsiteDetailsLayoutProps
) => {
    return (
        <>
            {children}
            <DistributionDetailsModal />
        </>
    );
};

export default WebsiteDetailsLayout;