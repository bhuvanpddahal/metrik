import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { UAParser } from "ua-parser-js";
import { differenceInSeconds } from "date-fns";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/drizzle/db";
import { eventDataSchema } from "../schemas";
import { EventTable } from "@/drizzle/schema/events";
import { SessionTable } from "@/drizzle/schema/sessions";
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
                sessionId,
                extraData
            } = c.req.valid("json");

            if (!href.includes(domain)) { // TODO: Match the requesting url with the href
                return c.json({ error: "Domain mismatch" }, 400);
            }

            const timestampDate = new Date(timestamp);

            const [session] = await db
                .select({ startTime: SessionTable.startTime })
                .from(SessionTable)
                .where(eq(SessionTable.id, sessionId));

            if (session) {
                await db.update(SessionTable)
                    .set({
                        duration: differenceInSeconds(timestampDate, session.startTime),
                        endTime: timestampDate
                    })
                    .where(eq(SessionTable.id, sessionId));
            } else {
                await db.insert(SessionTable).values({
                    id: sessionId,
                    websiteId,
                    duration: 0,
                    startTime: timestampDate,
                    endTime: timestampDate
                });
            }

            if (type === "pageview") {
                const userAgent = c.req.header("User-Agent");
                const parser = new UAParser(userAgent);
                const result = parser.getResult();

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
                    timestamp: timestampDate
                });
            } else {
                await db.insert(EventTable).values({
                    type,
                    websiteId,
                    visitorId,
                    sessionId,
                    extraData,
                    timestamp: timestampDate
                });
            }

            return c.json({ success: true });
        }
    );

export default app;