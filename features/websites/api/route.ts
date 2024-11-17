import { z } from "zod";
import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/drizzle/db";
import { addSiteSchema } from "../schemas";
import { WebsiteTable } from "@/drizzle/schema/websites";
import { hasInstalledScript as hasInstalledScriptFn } from "../queries";

const app = new Hono()
    .post(
        "/",
        verifyAuth(),
        zValidator("json", addSiteSchema),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { websiteId, domain, timezone } = c.req.valid("json");

            if (websiteId) {
                const website = await db.query.WebsiteTable.findFirst({
                    where: and(
                        eq(WebsiteTable.userId, userId),
                        eq(WebsiteTable.id, websiteId)
                    )
                });
                if (!website) return c.json({ error: "Website not found" }, 404);

                const [updatedWebsite] = await db.update(WebsiteTable)
                    .set({ domain, timezone })
                    .where(and(
                        eq(WebsiteTable.userId, userId),
                        eq(WebsiteTable.id, websiteId)
                    ))
                    .returning({
                        id: WebsiteTable.id
                    });

                return c.json({ data: updatedWebsite });
            } else {
                const existingWebsiteWithSameDomain = await db
                    .query
                    .WebsiteTable
                    .findFirst({
                        where: and(
                            eq(WebsiteTable.userId, userId),
                            eq(WebsiteTable.domain, domain)
                        )
                    });
                if (existingWebsiteWithSameDomain) {
                    return c.json({
                        error: `Website with domain '${domain}' already exists`
                    }, 400);
                }

                const [newWebsite] = await db.insert(WebsiteTable).values({
                    userId,
                    domain,
                    timezone
                }).returning({
                    id: WebsiteTable.id
                });

                return c.json({ data: newWebsite });
            }
        }
    )
    .get(
        "/:websiteId/verify-script",
        verifyAuth(),
        zValidator("param", z.object({ websiteId: z.string() })),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { websiteId } = c.req.valid("param");

            const website = await db.query.WebsiteTable.findFirst({
                where: and(
                    eq(WebsiteTable.userId, userId),
                    eq(WebsiteTable.id, websiteId)
                )
            });
            if (!website) return c.json({ error: "Website not found" }, 404);

            const hasInstalledScript = await hasInstalledScriptFn(
                website.id,
                website.domain
            );
            if (!hasInstalledScript) return c.json({ error: "Script doesn't exist" }, 404);

            return c.json({ data: { success: "Script installation verified" } });
        }
    );

export default app;