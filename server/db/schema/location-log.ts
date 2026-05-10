import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { user } from "./auth"
import { location } from "./location"

export const locationLog = sqliteTable("locationLog", {
    id: text().primaryKey(),
    name: text().notNull(),
    description: text(),
    startedAt: int().notNull(),
    endedAt: int().notNull(),
    lat: real().notNull(),
    lng: real().notNull(),
    locationId: text().notNull().references(() => location.id, { onDelete: "cascade" }),
    userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: int().notNull().$default(() => Date.now()),
    updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
})
