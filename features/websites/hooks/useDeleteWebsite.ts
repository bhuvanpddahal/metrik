import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useToast } from "@/hooks/useToast";
import { useDeleteWebsiteModal } from "./useDeleteWebsiteModal";

type RequestType = InferRequestType<typeof client.api.websites[":websiteId"]["$delete"]>;
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
            if (!response.ok) throw new Error("Failed to delete website");

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast({
                title: "Success",
                description: data.success
            });
            close();
            queryClient.invalidateQueries({ queryKey: ["websites"] });
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