import { create } from "zustand";

import type { ChartData } from "../queries";

interface UseDistributionDetailsModalState {
    isOpen: boolean;
    title: string;
    data: ChartData;
    dataKey: string;
    open: (state: { title: string; data: ChartData; dataKey: string; }) => void;
    close: () => void;
}

export const useDistributionDetailsModal = create<
    UseDistributionDetailsModalState
>((set) => ({
    isOpen: false,
    title: "",
    data: [],
    dataKey: "",
    open: ({ title, data, dataKey }) => set({ isOpen: true, title, data, dataKey }),
    close: () => set({ isOpen: false })
}));