import {
    integer,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { EventTable } from "./events";
import { VisitorTable } from "./visitors";
import { PageViewTable } from "./page-views";

export const SessionTable = pgTable("sessions", {
    id: uuid("id").primaryKey(),
    visitorId: uuid("visitor_id")
        .notNull()
        .references(() => VisitorTable.id, { onDelete: "cascade" }),
    referrer: text("referrer"),
    duration: integer("duration").notNull(),
    startTime: timestamp("start_time", { withTimezone: true })
        .notNull(),
    endTime: timestamp("end_time", { withTimezone: true })
        .notNull()
});

export const sessionRelations = relations(
    SessionTable,
    ({ one, many }) => ({
        visitor: one(VisitorTable, {
            fields: [SessionTable.visitorId],
            references: [VisitorTable.id]
        }),
        pageViews: many(PageViewTable),
        events: many(EventTable)
    })
);