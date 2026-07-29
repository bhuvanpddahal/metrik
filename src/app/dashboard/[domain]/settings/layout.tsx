import type { Metadata } from "next";

import BackButton from "@/app/dashboard/_components/BackButton";
import DeleteWebsiteModal from "@/features/websites/components/DeleteWebsiteModal";
import { sharedOpenGraph } from "@/constants/shared-metadata";

type Params = Promise<{
    domain: string;
}>;;

interface WebsiteSettingsLayoutProps {
    params: Params;
    children: React.ReactNode;
}

export const generateMetadata = async (
    { params }: { params: Params }
): Promise<Metadata> => {
    const { domain } = await params;
    const decodedDomain = decodeURIComponent(domain);

    return {
        title: `Settings for ${decodedDomain}`,
        openGraph: {
            ...sharedOpenGraph,
            title: `Settings for ${decodedDomain} | Metrik`,
            description: "Adjust the website settings & customize your preferences"
        }
    };
};

const WebsiteSettingsLayout = async ({
    params,
    children
}: WebsiteSettingsLayoutProps) => {
    const { domain } = await params;

    return (
        <div className="container pt-6 pb-12">
            <BackButton href={`/dashboard/${domain}`} btnText="Back" className="mb-3" />
            {children}
            <DeleteWebsiteModal />
        </div>
    );
};

export default WebsiteSettingsLayout;