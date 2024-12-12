import {
    integer,
    pgTable,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { WebsiteTable } from "./websites";
import { PageViewTable } from "./page-views";

export const SessionTable = pgTable("sessions", {
    id: uuid("id").primaryKey(),
    websiteId: uuid("website_id")
        .notNull()
        .references(() => WebsiteTable.id, { onDelete: "cascade" }),
    duration: integer("duration").notNull(),
    startTime: timestamp("start_time", { withTimezone: true })
        .notNull(),
    endTime: timestamp("end_time", { withTimezone: true })
        .notNull()
});

export const sessionRelations = relations(
    SessionTable,
    ({ one, many }) => ({
        website: one(WebsiteTable),
        pageViews: many(PageViewTable)
    })
);