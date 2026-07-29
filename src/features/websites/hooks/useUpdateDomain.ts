import { useRouter } from "nextjs-toploader/app";
import type { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useToast } from "@/hooks/useToast";

type RequestType = InferRequestType<typeof client.api.websites[":websiteId"]["domain"]["$patch"]> & {
    currentDomain: string;
};
type ResponseType = InferResponseType<typeof client.api.websites[":websiteId"]["domain"]["$patch"], 200>;

export const useUpdateDomain = () => {
    const router = useRouter();
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
        onSuccess: ({ data }, { param, json, currentDomain }) => {
            toast({
                title: "Success",
                description: data.success
            });
            queryClient.invalidateQueries({ queryKey: ["websites"] });
            window.metrik?.("domain_updated", {
                websiteId: param.websiteId,
                prevDomain: currentDomain,
                newDomain: json.domain
            });
            router.replace(`/dashboard/${encodeURIComponent(json.domain)}/settings`);
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