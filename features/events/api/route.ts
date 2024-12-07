import { Hono } from "hono";
import { UAParser } from "ua-parser-js";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/drizzle/db";
import { eventDataSchema } from "../schemas";
import { PageViewTable } from "@/drizzle/schema/page-views";

const app = new Hono()
    .post(
        "/",
        zValidator("json", eventDataSchema),
        async (c) => {
            const {
                websiteId,
                domain,
                type,
                href,
                referrer,
                timestamp,
                location,
                viewport,
                visitorId,
                sessionId
            } = c.req.valid("json");

            if (!href.includes(domain)) {
                return c.json({ error: "Domain mismatch" }, 400);
            }

            const userAgent = c.req.header("User-Agent");
            const parser = new UAParser(userAgent);
            const result = parser.getResult();

            if (type === "pageview") {
                await db.insert(PageViewTable).values({
                    websiteId,
                    visitorId,
                    sessionId,
                    page: href,
                    referrer,
                    country: location.country,
                    region: location.region,
                    city: location.city,
                    browser: result.browser.name ?? "Unknown",
                    operatingSystem: result.os.name ?? "Unknown",
                    device: result.device.type ?? "desktop",
                    screenResolution: `${viewport.width} x ${viewport.height}`,
                    timestamp: new Date(timestamp)
                });
            } else { }

            return c.json({ success: true });
        }
    );

export default app;