import { useQuery } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";

import { client } from "@/lib/rpc";
import { useGetWebsiteHeader } from "./useGetWebsiteHeader";
import type { OverviewChartIntervalKey } from "../constants";

export const useGetWebsiteData = (
    domain: string,
    interval: OverviewChartIntervalKey
) => {
    const router = useRouter();
    const { isInitialLoading } = useGetWebsiteHeader();

    const query = useQuery({
        queryKey: ["websites", domain, "data", { interval }],
        queryFn: async () => {
            const response = await client.api.websites[":domain"].data.$get({
                param: { domain },
                query: { interval }
            });
            if (!response.ok) {
                if (response.status === 400) {
                    const { error, websiteId, timezone } = await response.json();
                    router.push(`/dashboard/new?step=script&websiteId=${websiteId}&domain=${domain}&timezone=${timezone}`)
                    throw new Error(error);
                }

                const { error } = await response.json();
                throw new Error(error);
            }

            const { data } = await response.json();

            return data;
        },
        enabled: !isInitialLoading
    });

    return query;
};