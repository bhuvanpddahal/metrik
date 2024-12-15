import BackToDashboardButton from "../_components/BackToDashboardButton";

interface SettingsLayoutProps {
    children: React.ReactNode;
}

const SettingsLayout = (
    { children }: SettingsLayoutProps
) => {
    return (
        <div className="container pt-6 pb-12">
            <BackToDashboardButton btnText="Back" className="mb-3" />
            {children}
        </div>
    );
};

export default SettingsLayout;