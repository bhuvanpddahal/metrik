interface Window {
    metrik: (
        eventName: string,
        eventData: Record<string, any>
    ) => void;
}