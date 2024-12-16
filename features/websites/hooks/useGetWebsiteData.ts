import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useGetWebsiteDomain } from "./useGetWebsiteDomain";
import type { OverviewChartIntervalKey } from "../constants";

export const useGetWebsiteData = (
    websiteId: string,
    interval: OverviewChartIntervalKey
) => {
    const { isInitialLoading } = useGetWebsiteDomain(websiteId);

    const query = useQuery({
        queryKey: ["websites", websiteId, "data", { interval }],
        queryFn: async () => {
            const response = await client.api.websites[":websiteId"].data.$get({
                param: { websiteId },
                query: { interval }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch website data");
            }

            const { data } = await response.json();

            return data;
        },
        enabled: !isInitialLoading
    });

    return query;
};