import { create } from "zustand";

interface UseDeleteAccountModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useDeleteAccountModal = create<
    UseDeleteAccountModalState
>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));