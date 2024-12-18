import { signOut } from "@hono/auth-js/react";
import type { InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useToast } from "@/hooks/useToast";
import { useDeleteAccountModal } from "./useDeleteAccountModal";

type ResponseType = InferResponseType<typeof client.api.users.$delete, 200>;

export const useDeleteAccount = () => {
    const { toast } = useToast();
    const { close } = useDeleteAccountModal();

    const mutation = useMutation<
        ResponseType,
        Error,
        void
    >({
        mutationFn: async () => {
            const response = await client.api.users.$delete();
            if (!response.ok) {
                throw new Error("Failed to delete your account");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast({
                title: "Success",
                description: data.success
            });
            close();
            signOut();
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