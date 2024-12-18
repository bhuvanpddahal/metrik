import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWebsiteHeader = (websiteId: string) => {
    const query = useQuery({
        queryKey: ["websites", websiteId, "header"],
        queryFn: async () => {
            const response = await client.api.websites[":websiteId"].header.$get({ param: { websiteId } });
            if (!response.ok) {
                throw new Error("Failed to fetch website header");
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;
};