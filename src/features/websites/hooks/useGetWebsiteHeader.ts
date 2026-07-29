import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWebsiteHeader = () => {
    const query = useQuery({
        queryKey: ["websites", "header"],
        queryFn: async () => {
            const response = await client.api.websites.header.$get();
            if (!response.ok) {
                throw new Error("Failed to fetch website header");
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;
};