import { create } from "zustand";

interface useUserJourneyDetailsDrawerState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useUserJourneyDetailsDrawer = create<
    useUserJourneyDetailsDrawerState
>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));