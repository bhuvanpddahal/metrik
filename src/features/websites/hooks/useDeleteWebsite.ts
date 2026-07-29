import { useRouter } from "next/navigation";
import type { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useToast } from "@/hooks/useToast";
import { useDeleteWebsiteModal } from "./useDeleteWebsiteModal";

type RequestType = InferRequestType<typeof client.api.websites[":websiteId"]["$delete"]> & {
    domain: string;
};
type ResponseType = InferResponseType<typeof client.api.websites[":websiteId"]["$delete"], 200>;

export const useDeleteWebsite = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { close } = useDeleteWebsiteModal();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ param }) => {
            const response = await client.api.websites[":websiteId"].$delete({ param });
            if (!response.ok) {
                const parsedResponse = await response.json();
                throw new Error(parsedResponse.error);
            }

            return await response.json();
        },
        onSuccess: ({ data }, { param, domain }) => {
            toast({
                title: "Success",
                description: data.success
            });
            close();
            queryClient.invalidateQueries({ queryKey: ["websites"] });
            window.metrik?.("website_deleted", {
                websiteId: param.websiteId,
                domain
            });
            router.push("/dashboard");
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