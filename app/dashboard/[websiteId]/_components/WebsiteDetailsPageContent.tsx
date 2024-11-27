"use client";

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

interface WebsiteDetailsPageContentProps {
    websiteId: string;
}

const WebsiteDetailsPageContent = (
    { websiteId }: WebsiteDetailsPageContentProps
) => {
    return (
        <div className="container pt-6 pb-12">
            <WebsiteDetailsTitleLoader />
            {/* <WebsiteDetailsTitle /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <WebsiteOverviewCardLoader />
                {/* <WebsiteOverviewCard /> */}
                <DistributionCardLoader name="Referrer" />
                <DistributionCardLoader name="Page" />
                <DistributionCardLoader name="Country" />
                <DistributionCardLoader name="Device" />
                {/* <ReferrerSitesCard />
                <TopPagesCard />
                <CountriesCard />
                <DevicesCard /> */}
                <AddGoalsCardLoader />
                {/* <AddGoalsCard /> */}
            </div>
        </div>
    );
};

export default WebsiteDetailsPageContent;