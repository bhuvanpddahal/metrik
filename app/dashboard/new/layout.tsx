import BackToDashboardButton from "../_components/BackToDashboardButton";
import AddSiteProgress from "@/features/websites/components/AddSiteProgress";

interface NewWebsiteLayoutProps {
    children: React.ReactNode;
}

const NewWebsiteLayout = (
    { children }: NewWebsiteLayoutProps
) => {
    return (
        <div className="max-w-lg w-full mx-auto py-6">
            <BackToDashboardButton />
            <AddSiteProgress />
            {children}
        </div>
    );
};

export default NewWebsiteLayout;