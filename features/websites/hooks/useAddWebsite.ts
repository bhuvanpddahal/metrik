import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.websites["$post"]>;
type ResponseType = InferResponseType<typeof client.api.websites["$post"], 200>;

export const useAddWebsite = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            const response = await client.api.websites.$post({ json });
            if (!response.ok) throw new Error("Failed to add website");

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Website added");
            // TODO: Invalidate related queries
            // queryClient.invalidateQueries({ queryKey: ["websites"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return mutation;
};