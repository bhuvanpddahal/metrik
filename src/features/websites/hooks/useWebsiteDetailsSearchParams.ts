import {
    useQueryState,
    parseAsStringLiteral
} from "nuqs";
import { overviewChartIntervalsKeys } from "../constants";

export const useWebsiteDetailsSearchParams = () => {
    const [interval, setInterval] = useQueryState(
        "interval",
        parseAsStringLiteral(overviewChartIntervalsKeys).withDefault("today").withOptions({ clearOnDefault: true })
    );

    return {
        interval,
        setInterval
    };
};