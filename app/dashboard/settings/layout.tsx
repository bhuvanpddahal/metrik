import type { Metadata } from "next";

import BackButton from "../_components/BackButton";
import DeleteAccountModal from "@/features/users/components/DeleteAccountModal";
import { sharedOpenGraph } from "@/constants/shared-metadata";

interface DashboardSettingsLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Settings",
    openGraph: {
        ...sharedOpenGraph,
        title: "Settings | Metrik",
        description: "Adjust your profile settings & customize your preferences"
    }
};

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