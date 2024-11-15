import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/drizzle/db";
import { addSiteSchema } from "../schemas";
import { WebsiteTable } from "@/drizzle/schema/websites";

const app = new Hono()
    .post(
        "/",
        verifyAuth(),
        zValidator("json", addSiteSchema),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;
            const { domain, timezone } = c.req.valid("json");

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
                timezone,
            }).returning({
                id: WebsiteTable.id
            });

            return c.json({ data: newWebsite });
        }
    );

export default app;