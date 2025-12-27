import type { Metadata } from "next";

import WebsiteDetailsContent from "@/app/dashboard/[domain]/_components/WebsiteDetailsContent";
import { sharedOpenGraph } from "@/constants/shared-metadata";

interface WebsiteDetailsPageProps {
    params: Promise<{
        domain: string;
    }>;
}

export const generateMetadata = async (
    { params }: WebsiteDetailsPageProps
): Promise<Metadata> => {
    const { domain } = await params;
    const decodedDomain = decodeURIComponent(domain);

    return {
        title: decodedDomain,
        openGraph: {
            ...sharedOpenGraph,
            title: `${decodedDomain} | Metrik`,
            description: "See the details of the website's performance"
        }
    };
};

const WebsiteDetailsPage = async ({ params }: WebsiteDetailsPageProps) => {
    const { domain } = await params;

    return (
        <WebsiteDetailsContent domain={domain} />
    );
};

export default WebsiteDetailsPage;