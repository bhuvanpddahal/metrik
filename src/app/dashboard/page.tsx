import type { Metadata } from "next";

import DashboardContent from "./_components/DashboardContent";
import { sharedOpenGraph } from "@/constants/shared-metadata";

export const metadata: Metadata = {
    title: "Dashboard",
    openGraph: {
        ...sharedOpenGraph,
        title: "Dashboard | Metrik",
        description: "View all of your websites in the Metrik dashboard"
    }
};

const DashboardPage = () => {
    return (
        <DashboardContent />
    );
};

export default DashboardPage;