import {
    jsonb,
    pgEnum,
    pgTable,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { SessionTable } from "./sessions";

export const eventTypeEnum = pgEnum("type", ["signup", "payment", "custom"]);

export const EventTable = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id")
        .notNull()
        .references(() => SessionTable.id, { onDelete: "cascade" }),
    type: eventTypeEnum().notNull(),
    extraData: jsonb("extra_data").default("{}"),
    timestamp: timestamp("timestamp", { withTimezone: true })
        .notNull()
});

export const eventRelations = relations(
    EventTable,
    ({ one }) => ({
        session: one(SessionTable, {
            fields: [EventTable.sessionId],
            references: [SessionTable.id]
        })
    })
);