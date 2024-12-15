"use client";

import NavButtons from "./NavButtons";
import NavContent from "./NavContent";

const WebsiteSettingsContent = () => {
    return (
        <section>
            <h1 className="text-xl lg:text-2xl font-bold">
                Settings for apex-guard.vercel.app
            </h1>
            <div className="flex flex-col lg:flex-row gap-x-8 gap-y-5 mt-6">
                <NavButtons />
                <NavContent />
            </div>
        </section>
    );
};

export default WebsiteSettingsContent;