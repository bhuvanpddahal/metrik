import DistributionDetailsModal from "@/features/websites/components/DistributionDetailsModal";
import UserJourneyDetailsDrawer from "@/features/websites/components/UserJourneyDetailsDrawer";

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
            <UserJourneyDetailsDrawer />
        </>
    );
};

export default WebsiteDetailsLayout;