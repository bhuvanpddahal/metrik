import type { Metadata } from "next";

import BackButton from "../_components/BackButton";
import AddSiteProgress from "@/features/websites/components/AddSiteProgress";
import { sharedOpenGraph } from "@/constants/shared-metadata";

interface NewWebsiteLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "New Website",
    openGraph: {
        ...sharedOpenGraph,
        title: "New Website | Metrik",
        description: "Add a new website and start tracking to get valuable insights"
    }
};

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