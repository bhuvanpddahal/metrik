import { create } from "zustand";

interface UseDeleteWebsiteModalState {
    isOpen: boolean;
    websiteId: string;
    domain: string;
    open: (websiteId: string, domain: string) => void;
    close: () => void;
}

export const useDeleteWebsiteModal = create<
    UseDeleteWebsiteModalState
>((set) => ({
    isOpen: false,
    websiteId: "",
    domain: "",
    open: (websiteId, domain) => set({ isOpen: true, websiteId, domain }),
    close: () => set({ isOpen: false, websiteId: "" })
}));