import type { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useToast } from "@/hooks/useToast";

type RequestType = InferRequestType<typeof client.api.websites[":websiteId"]["domain"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.websites[":websiteId"]["domain"]["$patch"], 200>;

export const useUpdateDomain = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ param, json }) => {
            const response = await client.api.websites[":websiteId"].domain.$patch({ param, json });
            if (!response.ok) {
                const parsedResponse = await response.json();
                throw new Error(parsedResponse.error);
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast({
                title: "Success",
                description: data.success
            });
            queryClient.invalidateQueries({ queryKey: ["websites"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message
            });
        }
    });

    return mutation;
};