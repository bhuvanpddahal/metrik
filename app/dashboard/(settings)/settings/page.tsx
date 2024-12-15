import NavButtons from "./_components/NavButtons";
import NavContent from "./_components/NavContent";

const DashboardSettingsPage = () => {
    return (
        <section>
            <h1 className="text-xl lg:text-2xl font-bold">
                Settings
            </h1>
            <div className="flex flex-col lg:flex-row gap-x-8 gap-y-5 mt-6">
                <NavButtons />
                <NavContent />
            </div>
        </section>
    );
};

export default DashboardSettingsPage;