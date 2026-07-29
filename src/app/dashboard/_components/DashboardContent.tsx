"use client";

import { useRouter } from "nextjs-toploader/app";

import Error from "@/components/common/Error";
import DashboardTitle from "./DashboardTitle";
import WebsitesList from "@/features/websites/components/WebsitesList";
import WebsitesListLoader from "@/features/websites/components/skeletons/WebsitesListLoader";
import { Skeleton } from "@/components/ui/Skeleton";
import { useGetWebsites } from "@/features/websites/hooks/useGetWebsites";

const DashboardContent = () => {
    const router = useRouter();
    const { isLoading, data } = useGetWebsites();

    if (isLoading) return (
        <div className="container pt-4 pb-8">
            <Skeleton className="h-9 w-[6.495rem] bg-slate-50 dark:bg-card ml-auto" />
            <WebsitesListLoader />
        </div>
    );
    if (!data) return <Error message="Unexpected happened while trying to fetch websites" />
    if (!data.websites.length) router.push("/dashboard/new");

    return (
        <div className="container pt-4 pb-8">
            <DashboardTitle visitorsCount={data.visitorsCount} />
            <WebsitesList websites={data.websites} />
        </div>
    );
};

export default DashboardContent;