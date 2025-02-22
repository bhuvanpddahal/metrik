import type { Metadata } from "next";

import WebsiteDetailsContent from "./_components/WebsiteDetailsContent";
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
        <WebsiteDetailsContent domain={domain} />
    );
};

export default WebsiteDetailsPage;