import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { UAParser } from "ua-parser-js";
import { differenceInSeconds } from "date-fns";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/drizzle/db";
import {
    generateRandomNameForVisitor,
    getDomainNameFromUrl,
    getOriginFromUrl
} from "@/features/websites/utils";
import { eventDataSchema } from "../schemas";
import { VisitorTable } from "@/drizzle/schema";
import { EventTable } from "@/drizzle/schema/events";
import { SessionTable } from "@/drizzle/schema/sessions";
import { PageViewTable } from "@/drizzle/schema/page-views";
import { getWebsiteByDomain } from "@/features/websites/queries";

const app = new Hono()
    .post(
        "/",
        zValidator("json", eventDataSchema),
        async (c) => {
            const referer = c.req.header("referer");
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

            if (
                getDomainNameFromUrl(referer ?? null) !== domain ||
                !href.includes(domain)
            ) {
                return c.json({ error: "Domain mismatch" }, 400);
            }

            const website = await getWebsiteByDomain(domain);
            if (!website) return c.json({ error: "Invalid request" }, 400);

            const userAgent = c.req.header("User-Agent");
            const parser = new UAParser(userAgent);
            const result = parser.getResult();
            const timestampDate = new Date(timestamp);

            await db.insert(VisitorTable)
                .values({
                    ...location,
                    id: visitorId,
                    websiteId,
                    name: generateRandomNameForVisitor(),
                    browser: result.browser.name ?? "Unknown",
                    operatingSystem: result.os.name ?? "Unknown",
                    device: result.device.type ?? "desktop",
                    screenResolution: `${viewport.width} x ${viewport.height}`,
                    visitedAt: timestampDate,
                    updatedAt: timestampDate
                })
                .onConflictDoUpdate({
                    target: VisitorTable.id,
                    set: { ...location, updatedAt: timestampDate }
                });

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
                    visitorId,
                    referrer: getOriginFromUrl(referrer),
                    duration: 0,
                    startTime: timestampDate,
                    endTime: timestampDate
                });
            }

            if (type === "pageview") {
                await db.insert(PageViewTable).values({
                    sessionId,
                    page: href,
                    timestamp: timestampDate
                });
            } else {
                let eventType = type as string, eventExtraData = extraData;

                if (type === "custom") {
                    const { eventName, ...others } = extraData;
                    eventType = eventName as string;
                    eventExtraData = others;
                }

                await db.insert(EventTable).values({
                    sessionId,
                    type: eventType,
                    extraData: eventExtraData,
                    timestamp: timestampDate
                }).onConflictDoNothing();
            }

            return c.json({ success: true }, 200);
        }
    );

export default app;