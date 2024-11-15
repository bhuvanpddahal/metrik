"use client";

import PingDot from "./PingDot";

const AddSiteProgress = () => {
    return (
        <div className="flex gap-x-8 mt-12">
            <div className="flex items-center gap-x-3">
                <PingDot ping />
                <div className="text-primary text-sm font-semibold">
                    Add site
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <PingDot />
                <div className="text-muted-foreground text-sm font-semibold">
                    Install script
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <PingDot />
                <div className="text-muted-foreground text-sm font-semibold">
                    Connect revenue (optional)
                </div>
            </div>
        </div>
    );
};

export default AddSiteProgress;