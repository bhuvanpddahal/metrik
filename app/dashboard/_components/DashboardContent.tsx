"use client";

import { useRouter } from "next/navigation";

import Error from "@/components/Error";
import DashboardTitle from "./DashboardTitle";
import DashboardTitleLoader from "./skeletons/DashboardTitleLoader";
import WebsitesList from "@/features/websites/components/WebsitesList";
import WebsitesListLoader from "@/features/websites/components/skeletons/WebsitesListLoader";
import { useGetWebsites } from "@/features/websites/hooks/useGetWebsites";

const DashboardContent = () => {
    const router = useRouter();
    const { isLoading, data } = useGetWebsites();

    if (isLoading) return (
        <div className="container py-4">
            <DashboardTitleLoader />
            <WebsitesListLoader />
        </div>
    );
    if (!data) return <Error message="Unexpected happened while trying to fetch websites" />
    if (!data.websites.length) router.push("/dashboard/new");

    console.log({ data });

    return (
        <div className="container py-4">
            <DashboardTitle visitorsCount={data.visitorsCount} />
            <WebsitesList websites={data.websites} />
        </div>
    );
};

export default DashboardContent;