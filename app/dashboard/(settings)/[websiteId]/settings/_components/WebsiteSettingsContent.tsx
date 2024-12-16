"use client";

import NavButtons from "./NavButtons";
import NavContent from "./NavContent";
import Error from "@/components/Error";
import NavContentLoader from "./skeletons/NavContentLoader";
import { Skeleton } from "@/components/ui/Skeleton";
import { useGetWebsite } from "@/features/websites/hooks/useGetWebsite";

interface WebsiteSettingsContentProps {
    websiteId: string;
}

const WebsiteSettingsContent = (
    { websiteId }: WebsiteSettingsContentProps
) => {
    const { isLoading, data } = useGetWebsite(websiteId);

    if (isLoading) return (
        <section>
            <h1 className="flex items-center gap-x-2 lg:gap-x-2.5 text-xl lg:text-2xl font-bold">
                Settings for
                <Skeleton className="h-7 lg:h-8 w-40 lg:w-[11.5rem] bg-slate-50 rounded-sm" />
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