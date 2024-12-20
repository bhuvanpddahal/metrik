import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useGetWebsiteHeader } from "./useGetWebsiteHeader";
import type { OverviewChartIntervalKey } from "../constants";

export const useGetWebsiteData = (
    domain: string,
    interval: OverviewChartIntervalKey
) => {
    const { isInitialLoading } = useGetWebsiteHeader(domain);

    const query = useQuery({
        queryKey: ["websites", domain, "data", { interval }],
        queryFn: async () => {
            const response = await client.api.websites[":domain"].data.$get({
                param: { domain },
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