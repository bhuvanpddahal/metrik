import { Suspense } from "react";

import NavButtons from "./_components/NavButtons";
import NavContent from "./_components/NavContent";

const DashboardSettingsPage = () => {
    return (
        <section>
            <h1 className="text-xl lg:text-2xl font-semibold">
                Settings
            </h1>
            <div className="flex flex-col lg:flex-row gap-x-8 gap-y-5 mt-6">
                <Suspense>
                    <NavButtons />
                    <NavContent />
                </Suspense>
            </div>
        </section>
    );
};

export default DashboardSettingsPage;