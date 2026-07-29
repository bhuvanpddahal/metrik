"use client";

import Error from "@/components/common/Error";
import NavButtons from "@/app/dashboard/[domain]/settings/_components/NavButtons";
import NavContent from "@/app/dashboard/[domain]/settings/_components/NavContent";
import VerifyWebsiteAlert from "@/app/dashboard/[domain]/settings/_components/VerifyWebsiteAlert";
import NavContentLoader from "@/app/dashboard/[domain]/settings/_components/skeletons/NavContentLoader";
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
            <h1 className="flex items-center gap-x-[0.3125rem] lg:gap-x-1.5 text-xl lg:text-2xl font-bold">
                Settings for
                <Skeleton className="bg-slate-50 text-transparent rounded-sm pointer-events-none select-none dark:bg-card">
                    {decodeURIComponent(domain)}
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
            <h1 className="text-xl lg:text-2xl font-semibold">
                Settings for {data.website.domain}
            </h1>
            <div className="flex flex-col lg:flex-row gap-x-8 gap-y-5 mt-6">
                <NavButtons />
                <div className="max-w-[31.25rem] w-full space-y-4">
                    {!data.website.verifiedAt && (
                        <VerifyWebsiteAlert
                            websiteId={data.website.id}
                            domain={domain}
                            timezone={data.website.timezone}
                        />
                    )}
                    <NavContent
                        websiteId={data.website.id}
                        domain={data.website.domain}
                        timezone={data.website.timezone}
                    />
                </div>
            </div>
        </section>
    );
};

export default WebsiteSettingsContent;