"use client";

import NavButtons from "./NavButtons";
import NavContent from "./NavContent";
import Error from "@/components/Error";
import NavContentLoader from "./skeletons/NavContentLoader";
import { Skeleton } from "@/components/ui/Skeleton";
import { useGetWebsite } from "@/features/websites/hooks/useGetWebsite";

interface WebsiteSettingsContentProps {
    domain: string;
}

const WebsiteSettingsContent = (
    { domain }: WebsiteSettingsContentProps
) => {
    const { isLoading, data } = useGetWebsite(domain);

    if (isLoading) return (
        <section>
            <h1 className="flex items-center gap-x-1 lg:gap-x-1.5 text-xl lg:text-2xl font-bold">
                Settings for
                <Skeleton className="bg-slate-50 text-transparent rounded-sm pointer-events-none select-none dark:bg-card">
                    {domain}
                </Skeleton>
            </h1>
            <div className="flex flex-col lg:flex-row gap-x-8 gap-y-5 mt-6">
                <NavButtons />
                <NavContentLoader />
            </div>
        </section>
    );
    if (!data) return <Error message="Unexpected happened while trying to fetch the website settings" />

    return (
        <section>
            <h1 className="text-xl lg:text-2xl font-bold">
                Settings for {data.website.domain}
            </h1>
            <div className="flex flex-col lg:flex-row gap-x-8 gap-y-5 mt-6">
                <NavButtons />
                <NavContent
                    websiteId={data.website.id}
                    domain={data.website.domain}
                    timezone={data.website.timezone}
                />
            </div>
        </section>
    );
};

export default WebsiteSettingsContent;