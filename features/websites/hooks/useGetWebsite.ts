import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWebsite = (websiteId: string) => {
    const query = useQuery({
        queryKey: ["websites", websiteId],
        queryFn: async () => {
            const response = await client.api.websites[":websiteId"].$get({ param: { websiteId } });
            if (!response.ok) {
                throw new Error("Failed to fetch website domain");
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;
};