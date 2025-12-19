"use client";

import Snowfall, { type SnowfallProps } from "react-snowfall";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const winterMonths = [11, 0, 1]; // Dec, Jan, Feb

const SeasonalSnowfall = (props: SnowfallProps) => {
    const { resolvedTheme } = useTheme();
    const [isWinterSeason, setIsWinterSeason] = useState(false);

    const color = resolvedTheme === "light"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(255, 255, 255, 0.3)";

    useEffect(() => {
        const currentMonth = new Date().getMonth();
        if (winterMonths.includes(currentMonth)) {
            setIsWinterSeason(true);
        }
    }, []);

    if (!isWinterSeason) return null;

    return (
        <Snowfall
            color={color}
            radius={[0.5, 5.0]}
            snowflakeCount={50}
            {...props}
        />
    );
};

export default SeasonalSnowfall;