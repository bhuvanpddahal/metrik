import {
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { UserTable } from "./users";

export const WebsiteTable = pgTable(
    "websites",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: uuid("user_id")
            .notNull()
            .references(() => UserTable.id, { onDelete: "cascade" }),
        domain: text("domain").notNull(),
        timezone: text("timezone").notNull(),
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
    ({ one }) => ({
        user: one(UserTable, {
            fields: [WebsiteTable.userId],
            references: [UserTable.id]
        })
    })
);