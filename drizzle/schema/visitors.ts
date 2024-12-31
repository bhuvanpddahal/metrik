import {
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { SessionTable } from "./sessions";
import { WebsiteTable } from "./websites";

export const VisitorTable = pgTable("visitors", {
    id: uuid("id").primaryKey(),
    websiteId: uuid("website_id")
        .notNull()
        .references(() => WebsiteTable.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    country: text("country").notNull(),
    region: text("region").notNull(),
    city: text("city").notNull(),
    browser: text("browser").notNull(),
    operatingSystem: text("operating_system").notNull(),
    device: text("device").notNull(),
    screenResolution: text("screen_resolution").notNull(),
    visitedAt: timestamp("visited_at", { withTimezone: true })
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
});

export const visitorRelations = relations(
    VisitorTable,
    ({ one, many }) => ({
        website: one(WebsiteTable, {
            fields: [VisitorTable.websiteId],
            references: [WebsiteTable.id]
        }),
        sessions: many(SessionTable)
    })
);