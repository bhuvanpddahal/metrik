import { z } from "zod";

export const eventDataSchema = z.object({
    websiteId: z.string(),
    domain: z.string(),
    type: z.enum(["pageview", "signup", "payment", "custom"]),
    href: z.string(),
    referrer: z.string().nullable(),
    timestamp: z.string(),
    location: z.object({
        country: z.string(),
        region: z.string(),
        city: z.string()
    }),
    viewport: z.object({
        width: z.number(),
        height: z.number()
    }),
    visitorId: z.string(),
    sessionId: z.string(),
    extraData: z.record(z.unknown()).optional()
}).refine((data) => {
    if (data.type === "pageview") return true;
    if (!data.extraData) return false;
    if (data.type === "custom" && !("eventName" in data.extraData)) return false;

    return true;
}, {
    message: "Invalid data passed",
    path: ["extraData"]
});