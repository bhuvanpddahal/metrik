"use client";

import Error from "@/components/Error";
import DevicesCard from "@/features/websites/components/DevicesCard";
import TopPagesCard from "@/features/websites/components/TopPagesCard";
import CountriesCard from "@/features/websites/components/CountriesCard";
import ReferrerSitesCard from "@/features/websites/components/ReferrerSitesCard";
import WebsiteOverviewCard from "@/features/websites/components/WebsiteOverviewCard";
import DistributionCardLoader from "@/features/websites/components/skeletons/DistributionCardLoader";
import WebsiteOverviewCardLoader from "@/features/websites/components/skeletons/WebsiteOverviewCardLoader";
import { useGetWebsiteData } from "@/features/websites/hooks/useGetWebsiteData";
import { useGetWebsiteDomain } from "@/features/websites/hooks/useGetWebsiteDomain";
import { useWebsiteDetailsSearchParams } from "@/features/websites/hooks/useWebsiteDetailsSearchParams";

interface WebsiteDetailsPageDataProps {
    websiteId: string;
}

const WebsiteDetailsPageData = (
    { websiteId }: WebsiteDetailsPageDataProps
) => {
    const { interval } = useWebsiteDetailsSearchParams();
    const { isLoading: isLoadingData, data } = useGetWebsiteData(websiteId, interval);
    const { isInitialLoading: isInitialLoadingDomain } = useGetWebsiteDomain(websiteId);

    if (isInitialLoadingDomain || isLoadingData) return (
        <>
            <WebsiteOverviewCardLoader />
            <DistributionCardLoader name="Referrer" />
            <DistributionCardLoader name="Page" />
            <DistributionCardLoader name="Country" />
            <DistributionCardLoader name="Device" />
        </>
    );
    if (!data) return (
        <Error
            message="Unexpected happened while trying to fetch website data"
            className="md:col-span-2"
        />
    );

    return (
        <>
            <WebsiteOverviewCard
                startDate={data.startDate}
                endDate={data.endDate}
                visitorsCount={data.visitorsCount}
                visitorsCountChangeInPercentage={data.visitorsCountChangeInPercentage}
                bounceRate={data.bounceRate}
                bounceRateChangeInPercentage={data.bounceRateChangeInPercentage}
                averageSessionTime={data.averageSessionTime}
                averageSessionTimeChangeInPercentage={data.averageSessionTimeChangeInPercentage}
                liveVisitorsCount={data.liveVisitorsCount}
                overviewChartData={data.overviewChartData}
            />
            <ReferrerSitesCard referrerChartData={data.referrerChartData} />
            <TopPagesCard pageChartData={data.pageChartData} />
            <CountriesCard
                countryChartData={data.countryChartData}
                regionChartData={data.regionChartData}
                cityChartData={data.cityChartData}
            />
            <DevicesCard
                browserChartData={data.browserChartData}
                operatingSystemChartData={data.operatingSystemChartData}
                deviceChartData={data.deviceChartData}
            />
        </>
    );
};

export default WebsiteDetailsPageData;