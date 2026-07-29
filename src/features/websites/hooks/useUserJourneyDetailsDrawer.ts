import { create } from "zustand";

import type { Visitor } from "../types";

interface useUserJourneyDetailsDrawerState {
    isOpen: boolean;
    domain: string;
    visitor?: Visitor;
    open: (domain: string, visitor: Visitor) => void;
    close: () => void;
}

export const useUserJourneyDetailsDrawer = create<
    useUserJourneyDetailsDrawerState
>((set) => ({
    isOpen: false,
    domain: "",
    visitor: undefined,
    open: (domain, visitor) => set({ isOpen: true, domain, visitor }),
    close: () => set({ isOpen: false, domain: "", visitor: undefined })
}));