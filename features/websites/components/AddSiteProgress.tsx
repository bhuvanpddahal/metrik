"use client";

import ProgressIndicator from "./ProgressIndicator";
import { cn } from "@/lib/utils";
import { useAddWebsiteSearchParams } from "../hooks/useAddWebsiteSearchParams";

const AddSiteProgress = () => {
    const { step, setStep } = useAddWebsiteSearchParams();

    return (
        <div className="flex gap-x-8 mt-12">
            <div
                className={cn(
                    "flex items-center gap-x-3",
                    step === "script" ? "cursor-pointer" : "pointer-events-none"
                )}
                onClick={() => setStep("site")}
            >
                <ProgressIndicator type={step === "script" ? "checked" : "active"} />
                <div className="text-primary text-sm font-semibold">
                    Add site
                </div>
            </div>
            <div className={cn(
                "flex items-center gap-x-3",
                step !== "script" && "cursor-not-allowed pointer-events-none"
            )}>
                <ProgressIndicator type={step === "script" ? "active" : "muted"} />
                <div className="text-muted-foreground text-sm font-semibold">
                    Install script
                </div>
            </div>
        </div>
    );
};

export default AddSiteProgress;