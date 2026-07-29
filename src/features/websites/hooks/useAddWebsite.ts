import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useAddWebsiteSearchParams } from "./useAddWebsiteSearchParams";

type RequestType = InferRequestType<typeof client.api.websites.$post>;
type ResponseType = InferResponseType<typeof client.api.websites.$post, 200>;

export const useAddWebsite = () => {
    const queryClient = useQueryClient();
    const {
        setStep,
        setWebsiteId,
        setDomain,
        setTimezone
    } = useAddWebsiteSearchParams();

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
        onSuccess: ({ data }, { json }) => {
            toast.success(json.websiteId ? "Website updated" : "Website added");
            setStep("script");
            setWebsiteId(data.id);
            setDomain(json.domain);
            setTimezone(json.timezone);
            queryClient.invalidateQueries({ queryKey: ["websites"] });
            window.metrik?.("website_added", {
                websiteId: data.id,
                domain: json.domain
            });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return mutation;
};