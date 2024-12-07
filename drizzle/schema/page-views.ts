import {
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { WebsiteTable } from "./websites";

export const PageViewTable = pgTable("page_views", {
    id: uuid("id").primaryKey().defaultRandom(),
    websiteId: uuid("website_id")
        .notNull()
        .references(() => WebsiteTable.id, { onDelete: "cascade" }),
    visitorId: uuid("visitor_id").notNull(),
    sessionId: uuid("session_id").notNull(),
    page: text("page").notNull(),
    referrer: text("referrer"),
    country: text("country").notNull(),
    region: text("region").notNull(),
    city: text("city").notNull(),
    browser: text("browser").notNull(),
    operatingSystem: text("operating_system").notNull(),
    device: text("device").notNull(),
    screenResolution: text("screen_resolution").notNull(),
    timestamp: timestamp("timestamp", { withTimezone: true })
        .notNull()
});

export const pageViewRelations = relations(
    PageViewTable,
    ({ one }) => ({
        website: one(WebsiteTable, {
            fields: [PageViewTable.websiteId],
            references: [WebsiteTable.id]
        })
    })
);