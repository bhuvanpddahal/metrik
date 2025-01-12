import {
    jsonb,
    pgTable,
    text,
    timestamp,
    unique,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { SessionTable } from "./sessions";

export const EventTable = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id")
        .notNull()
        .references(() => SessionTable.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    extraData: jsonb("extra_data")
        .$type<{ [key: string]: unknown; }>()
        .notNull(),
    timestamp: timestamp("timestamp", { withTimezone: true })
        .notNull()
}, (event) => ({
    uniqueTypeAndExtraData: unique("events.unique_type_&_extra_data")
        .on(event.type, event.extraData)
}));

export const eventRelations = relations(
    EventTable,
    ({ one }) => ({
        session: one(SessionTable, {
            fields: [EventTable.sessionId],
            references: [SessionTable.id]
        })
    })
);