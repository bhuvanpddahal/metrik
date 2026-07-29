import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWebsites = () => {
    const query = useQuery({
        queryKey: ["websites"],
        queryFn: async () => {
            const response = await client.api.websites.$get();
            if (!response.ok) {
                throw new Error("Failed to fetch websites");
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;
};