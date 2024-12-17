import {
    jsonb,
    pgEnum,
    pgTable,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { WebsiteTable } from "./websites";
import { SessionTable } from "./sessions";

export const eventTypeEnum = pgEnum("type", ["signup", "payment", "custom"]);

export const EventTable = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    type: eventTypeEnum().notNull(),
    websiteId: uuid("website_id")
        .notNull()
        .references(() => WebsiteTable.id, { onDelete: "cascade" }),
    visitorId: uuid("visitor_id").notNull(),
    sessionId: uuid("session_id")
        .notNull()
        .references(() => SessionTable.id, { onDelete: "cascade" }),
    extraData: jsonb("extra_data").default("{}"),
    timestamp: timestamp("timestamp", { withTimezone: true })
        .notNull()
});

export const eventRelations = relations(
    EventTable,
    ({ one }) => ({
        website: one(WebsiteTable, {
            fields: [EventTable.websiteId],
            references: [WebsiteTable.id]
        }),
        session: one(SessionTable, {
            fields: [EventTable.sessionId],
            references: [SessionTable.id]
        })
    })
);