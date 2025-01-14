import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.websites[":websiteId"]["verify-script"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.websites[":websiteId"]["verify-script"]["$patch"], 200>;

export const useVerifyScriptInstallation = () => {
    const router = useRouter();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ param }) => {
            const response = await client.api.websites[":websiteId"]["verify-script"].$patch({ param });
            if (!response.ok) throw new Error("Looks like the script is not installed, please try again.");

            return await response.json();
        },
        onSuccess: ({ data }, { param }) => {
            toast.success(data.success);
            router.push(`/dashboard/${param.websiteId}`);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return mutation;
};