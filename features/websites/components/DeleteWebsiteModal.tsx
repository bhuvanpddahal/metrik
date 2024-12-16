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
import { useDeleteWebsite } from "../hooks/useDeleteWebsite";
import { useDeleteWebsiteModal } from "../hooks/useDeleteWebsiteModal";

const DeleteWebsiteModal = () => {
    const { isOpen, websiteId, close } = useDeleteWebsiteModal();
    const { mutate: deleteWebsite, isPending } = useDeleteWebsite();

    const handleContinue = () => {
        deleteWebsite({ param: { websiteId } });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={close}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Website</AlertDialogTitle>
                    <AlertDialogDescription>
                        All of your data will be lost. Are you sure you want to delete this website?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        className="border"
                        onClick={handleContinue}
                        isLoading={isPending}
                    >
                        {isPending ? "Deleting" : "Continue"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteWebsiteModal;