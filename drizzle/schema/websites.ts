import {
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import timezones from "@/features/websites/timezones.json";
import { UserTable } from "./users";
import { EventTable } from "./events";
import { SessionTable } from "./sessions";
import { PageViewTable } from "./page-views";

const timezoneKeys = Object.keys(timezones);

export const timezoneEnum = pgEnum("timezone", [timezoneKeys[0], ...timezoneKeys.slice(1)]);

export const WebsiteTable = pgTable(
    "websites",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: uuid("user_id")
            .notNull()
            .references(() => UserTable.id, { onDelete: "cascade" }),
        domain: text("domain").notNull().unique(),
        timezone: timezoneEnum().notNull(),
        addedAt: timestamp("added_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date())
    },
    (website) => ({
        uniqueUserIdAndDomainIndex: uniqueIndex("websites.unique_user_id_&_domain_index")
            .on(website.userId, website.domain)
    })
);

export const websiteRelations = relations(
    WebsiteTable,
    ({ one, many }) => ({
        user: one(UserTable, {
            fields: [WebsiteTable.userId],
            references: [UserTable.id]
        }),
        pageViews: many(PageViewTable),
        sessions: many(SessionTable),
        events: many(EventTable)
    })
);