import {
    useQueryState,
    parseAsStringLiteral,
} from "nuqs";

const tabs = ["general", "more"] as const;

export const useSettingsSearchParams = () => {
    const [tab, setTab] = useQueryState(
        "tab",
        parseAsStringLiteral(tabs).withDefault("general").withOptions({ clearOnDefault: true })
    );

    return {
        tab,
        setTab
    };
};