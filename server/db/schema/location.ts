import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { user } from "./auth"

export const location = sqliteTable("location", {
    id: text().primaryKey(),
    name: text().notNull(),
    slug: text().notNull().unique(),
    description: text(),
    lat: real().notNull(),
    lng: real().notNull(),
    userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: int().notNull().$default(() => Date.now()),
    updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
})
