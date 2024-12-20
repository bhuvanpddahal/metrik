import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWebsiteHeader = (domain: string) => {
    const query = useQuery({
        queryKey: ["websites", domain, "header"],
        queryFn: async () => {
            const response = await client.api.websites[":domain"].header.$get({ param: { domain } });
            if (!response.ok) {
                throw new Error("Failed to fetch website header");
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;
};