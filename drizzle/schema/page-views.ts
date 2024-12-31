import {
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { SessionTable } from "./sessions";

export const PageViewTable = pgTable("page_views", {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id")
        .notNull()
        .references(() => SessionTable.id, { onDelete: "cascade" }),
    page: text("page").notNull(),
    timestamp: timestamp("timestamp", { withTimezone: true })
        .notNull()
});

export const pageViewRelations = relations(
    PageViewTable,
    ({ one }) => ({
        session: one(SessionTable, {
            fields: [PageViewTable.sessionId],
            references: [SessionTable.id]
        })
    })
);