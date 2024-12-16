import { create } from "zustand";

interface UseDeleteWebsiteModalState {
    isOpen: boolean;
    websiteId: string;
    open: (websiteId: string) => void;
    close: () => void;
}

export const useDeleteWebsiteModal = create<
    UseDeleteWebsiteModalState
>((set) => ({
    isOpen: false,
    websiteId: "",
    open: (websiteId) => set({ isOpen: true, websiteId }),
    close: () => set({ isOpen: false, websiteId: "" })
}));