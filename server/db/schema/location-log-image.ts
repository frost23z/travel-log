import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { user } from "./auth"
import { locationLog } from "./location-log"

export const locationLogImage = sqliteTable("locationLogImage", {
    id: text().primaryKey(),
    key: text().notNull(),
    locationLogId: text().notNull().references(() => locationLog.id, { onDelete: "cascade" }),
    userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: int().notNull().$default(() => Date.now()),
    updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
})
