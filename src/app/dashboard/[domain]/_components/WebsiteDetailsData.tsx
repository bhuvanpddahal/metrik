"use client";

import Error from "@/components/common/Error";
import GoalsCard from "@/features/websites/components/GoalsCard";
import DevicesCard from "@/features/websites/components/DevicesCard";
import TopPagesCard from "@/features/websites/components/TopPagesCard";
import CountriesCard from "@/features/websites/components/CountriesCard";
import ReferrerSitesCard from "@/features/websites/components/ReferrerSitesCard";
import WebsiteOverviewCard from "@/features/websites/components/WebsiteOverviewCard";
import GoalsCardLoader from "@/features/websites/components/skeletons/GoalsCardLoader";
import DistributionCardLoader from "@/features/websites/components/skeletons/DistributionCardLoader";
import WebsiteOverviewCardLoader from "@/features/websites/components/skeletons/WebsiteOverviewCardLoader";
import { useGetWebsiteData } from "@/features/websites/hooks/useGetWebsiteData";
import { useGetWebsiteHeader } from "@/features/websites/hooks/useGetWebsiteHeader";
import { useWebsiteDetailsSearchParams } from "@/features/websites/hooks/useWebsiteDetailsSearchParams";

interface WebsiteDetailsDataProps {
    domain: string;
}

const WebsiteDetailsData = (
    { domain }: WebsiteDetailsDataProps
) => {
    const { interval } = useWebsiteDetailsSearchParams();
    const { isInitialLoading: isInitialLoadingDomain } = useGetWebsiteHeader();
    const { isLoading: isLoadingData, data, error } = useGetWebsiteData(domain, interval);

    if ((!data && isInitialLoadingDomain) || isLoadingData) return (
        <>
            <WebsiteOverviewCardLoader />
            <DistributionCardLoader name="Referrer" />
            <DistributionCardLoader name="Page" />
            <DistributionCardLoader name="Country" />
            <DistributionCardLoader name="Device" />
            <GoalsCardLoader />
        </>
    );
    if (!data) return (
        <Error message={error?.message} className="md:col-span-2" />
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
            <GoalsCard
                domain={domain}
                goalChartData={data.goalChartData}
                userJourneyData={data.userJourneyData}
            />
        </>
    );
};

export default WebsiteDetailsData;