import { Hono } from "hono";
import { eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { verifyAuth } from "@hono/auth-js";
import { UserTable } from "@/drizzle/schema";

const app = new Hono()
    .delete(
        "/",
        verifyAuth(),
        async (c) => {
            const authUser = c.get("authUser");
            const userId = authUser.session.user.id;

            await db.delete(UserTable)
                .where(eq(UserTable.id, userId));

            return c.json({ data: { success: "Your account has been deleted" } }, 200);
        }
    );

export default app;