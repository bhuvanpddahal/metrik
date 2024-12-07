import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWebsiteDomain = (websiteId: string) => {
    const query = useQuery({
        queryKey: ["websites", websiteId, "domain"],
        queryFn: async () => {
            const response = await client.api.websites[":websiteId"].domain.$get({ param: { websiteId } });
            if (!response.ok) {
                throw new Error("Failed to fetch website domain");
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;
};