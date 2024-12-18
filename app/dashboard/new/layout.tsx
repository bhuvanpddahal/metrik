import AddSiteProgress from "@/features/websites/components/AddSiteProgress";
import BackButton from "../_components/BackButton";

interface NewWebsiteLayoutProps {
    children: React.ReactNode;
}

const NewWebsiteLayout = (
    { children }: NewWebsiteLayoutProps
) => {
    return (
        <div className="max-w-lg w-full mx-auto py-6">
            <BackButton href="/dashboard" btnText="Dashboard" />
            <AddSiteProgress />
            {children}
        </div>
    );
};

export default NewWebsiteLayout;