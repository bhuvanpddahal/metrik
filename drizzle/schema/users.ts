import {
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { WebsiteTable } from "./websites";

export const UserTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    email: text("email").notNull().unique(),
    image: text("image"),
    emailVerified: timestamp("email_verified", {
        mode: "date",
        withTimezone: true
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date())
});

export const userRelations = relations(
    UserTable,
    ({ many }) => ({
        websites: many(WebsiteTable)
    })
);