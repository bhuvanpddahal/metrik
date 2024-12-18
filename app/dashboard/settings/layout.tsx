import BackButton from "../_components/BackButton";
import DeleteAccountModal from "@/features/users/components/DeleteAccountModal";

interface DashboardSettingsLayoutProps {
    children: React.ReactNode;
}

const DashboardSettingsLayout = (
    { children }: DashboardSettingsLayoutProps
) => {
    return (
        <div className="container pt-6 pb-12">
            <BackButton href="/dashboard" btnText="Back" className="mb-3" />
            {children}
            <DeleteAccountModal />
        </div>
    );
};

export default DashboardSettingsLayout;