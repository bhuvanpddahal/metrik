"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { useDeleteAccountModal } from "../hooks/useDeleteAccountModal";

const DeleteAccountModal = () => {
    const { isOpen, close } = useDeleteAccountModal();
    const { mutate: deleteAccount, isPending } = useDeleteAccount();

    return (
        <AlertDialog open={isOpen} onOpenChange={close}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    <AlertDialogDescription>
                        All of your data will be lost. Are you sure you want to delete your account?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        className="border"
                        onClick={() => deleteAccount()}
                        isLoading={isPending}
                    >
                        {isPending ? "Deleting" : "Continue"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAccountModal;