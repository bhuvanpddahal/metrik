"use client";

import Error from "@/components/Error";
import WebsiteDetailsTitle from "./WebsiteDetailsTitle";
import DevicesCard from "@/features/websites/components/DevicesCard";
import AddGoalsCard from "@/features/websites/components/AddGoalsCard";
import TopPagesCard from "@/features/websites/components/TopPagesCard";
import CountriesCard from "@/features/websites/components/CountriesCard";
import WebsiteDetailsTitleLoader from "./skeletons/WebsiteDetailsTitleLoader";
import ReferrerSitesCard from "@/features/websites/components/ReferrerSitesCard";
import WebsiteOverviewCard from "@/features/websites/components/WebsiteOverviewCard";
import AddGoalsCardLoader from "@/features/websites/components/skeletons/AddGoalsCardLoader";
import DistributionCardLoader from "@/features/websites/components/skeletons/DistributionCardLoader";
import WebsiteOverviewCardLoader from "@/features/websites/components/skeletons/WebsiteOverviewCardLoader";
import { useGetWebsite } from "@/features/websites/hooks/useGetWebsite";

interface WebsiteDetailsPageContentProps {
    websiteId: string;
}

const WebsiteDetailsPageContent = (
    { websiteId }: WebsiteDetailsPageContentProps
) => {
    const { isLoading, data } = useGetWebsite(websiteId);

    if (isLoading) return (
        <div className="container pt-6 pb-12">
            <WebsiteDetailsTitleLoader />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <WebsiteOverviewCardLoader />
                <DistributionCardLoader name="Referrer" />
                <DistributionCardLoader name="Page" />
                <DistributionCardLoader name="Country" />
                <DistributionCardLoader name="Device" />
                <AddGoalsCardLoader />
            </div>
        </div>
    );
    if (!data) return <Error message="Unexpected happened while trying to fetch website" />

    return (
        <div className="container pt-6 pb-12">
            <WebsiteDetailsTitle />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <WebsiteOverviewCard />
                <ReferrerSitesCard />
                <TopPagesCard />
                <CountriesCard />
                <DevicesCard />
                <AddGoalsCard />
            </div>
        </div>
    );
};

export default WebsiteDetailsPageContent;