import {
    useQueryState,
    parseAsStringLiteral,
} from "nuqs";

const tabs = ["general", "goals", "reports"] as const;

export const useWebsiteSettingsSearchParams = () => {
    const [tab, setTab] = useQueryState(
        "tab",
        parseAsStringLiteral(tabs).withDefault("general").withOptions({ clearOnDefault: true })
    );

    return {
        tab,
        setTab
    };
};