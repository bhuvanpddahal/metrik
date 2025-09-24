import { Metadata } from "next";

import { sharedOpenGraph } from "@/constants/shared-metadata";

export const metadata: Metadata = {
    title: "Billing",
    openGraph: {
        ...sharedOpenGraph,
        title: "Billing | Metrik",
        description: "Manage subscriptions and billing information"
    }
};

const BillingPage = () => {
    return (
        <div className="max-w-lg w-full mx-auto py-6">
            <h1 className="text-2xl font-semibold">Billing (Work in Progress)</h1>
        </div>
    );
};

export default BillingPage;