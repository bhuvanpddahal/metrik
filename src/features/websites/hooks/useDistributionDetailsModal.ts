import { create } from "zustand";

import type { ChartData } from "../types";

type LabelFormatter = (value: string | null) => string;

interface DistributionData {
    title: string;
    chartData: ChartData;
    dataKey: string;
    labelFormatter?: LabelFormatter;
    labelClassName?: string;
}

interface UseDistributionDetailsModalState extends DistributionData {
    isOpen: boolean;
    open: (data: DistributionData) => void;
    close: () => void;
}

const defaultDistrubutionData: DistributionData = {
    title: "",
    chartData: [],
    dataKey: "",
    labelFormatter: undefined,
    labelClassName: ""
};

export const useDistributionDetailsModal = create<
    UseDistributionDetailsModalState
>((set) => ({
    ...defaultDistrubutionData,
    isOpen: false,
    open: (data) => set({ isOpen: true, ...data }),
    close: () => set({ isOpen: false, ...defaultDistrubutionData })
}));