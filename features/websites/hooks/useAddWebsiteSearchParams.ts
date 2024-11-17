import {
    useQueryState,
    parseAsStringLiteral,
    parseAsString
} from "nuqs";

const steps = ["site", "script"] as const;

export const useAddWebsiteSearchParams = () => {
    const [step, setStep] = useQueryState(
        "step",
        parseAsStringLiteral(steps).withDefault("site").withOptions({ shallow: false })
    );
    const [websiteId, setWebsiteId] = useQueryState(
        "websiteId",
        parseAsString.withDefault("").withOptions({ clearOnDefault: true, shallow: false })
    );
    const [domain, setDomain] = useQueryState(
        "domain",
        parseAsString.withDefault("").withOptions({ clearOnDefault: true, shallow: false })
    );
    const [timezone, setTimezone] = useQueryState(
        "timezone",
        parseAsString.withDefault("").withOptions({ clearOnDefault: true, shallow: false })
    );

    return {
        step,
        setStep,
        websiteId,
        setWebsiteId,
        domain,
        setDomain,
        timezone,
        setTimezone
    };
};