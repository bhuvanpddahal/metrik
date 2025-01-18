import type { Metadata } from "next";

import WebsiteDetailsData from "./_components/WebsiteDetailsData";
import WebsiteDetailsHeader from "./_components/WebsiteDetailsHeader";
import { sharedOpenGraph } from "@/constants/shared-metadata";

interface WebsiteDetailsPageProps {
    params: {
        domain: string;
    };
}

export const generateMetadata = ({
    params: { domain }
}: WebsiteDetailsPageProps): Metadata => ({
    title: domain,
    openGraph: {
        ...sharedOpenGraph,
        title: `${domain} | Metrik`,
        description: "See the details of the website's performance"
    }
});

const WebsiteDetailsPage = async ({
    params: { domain }
}: WebsiteDetailsPageProps) => {
    return (
        <div className="container pt-6 pb-12">
            <WebsiteDetailsHeader domain={domain} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <WebsiteDetailsData domain={domain} />
            </div>
        </div>
    );
};

export default WebsiteDetailsPage;