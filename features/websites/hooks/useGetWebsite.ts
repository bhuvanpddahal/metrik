import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWebsite = (domain: string) => {
    const query = useQuery({
        queryKey: ["websites", domain],
        queryFn: async () => {
            const response = await client.api.websites[":domain"].$get({ param: { domain } });
            if (!response.ok) {
                throw new Error("Failed to fetch website");
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;
};