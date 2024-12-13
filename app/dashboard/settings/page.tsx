import TabButtons from "./_components/TabButtons";
import TabContent from "./_components/TabContent";
import BackToDashboardButton from "../_components/BackToDashboardButton";

const SettingsPage = () => {
    return (
        <div className="container pt-6 pb-12">
            <BackToDashboardButton btnText="Back" />
            <h1 className="text-xl lg:text-2xl font-bold mt-3">
                Settings
            </h1>
            <div className="flex flex-col lg:flex-row gap-5 mt-6">
                <TabButtons />
                <TabContent />
            </div>
        </div>
    );
};

export default SettingsPage;