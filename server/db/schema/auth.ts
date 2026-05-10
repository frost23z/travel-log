import { relations } from "drizzle-orm"
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const user = sqliteTable("user", {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: int({ mode: "boolean" }).notNull().default(false),
    image: text(),
    createdAt: int().notNull().$default(() => Date.now()),
    updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
})

export const session = sqliteTable("session", {
    id: text().primaryKey(),
    expiresAt: int().notNull(),
    token: text().notNull().unique(),
    ipAddress: text(),
    userAgent: text(),
    userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: int().notNull().$default(() => Date.now()),
    updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, table => [index("session_userId_idx").on(table.userId)])

export const account = sqliteTable("account", {
    id: text().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: int(),
    refreshTokenExpiresAt: int(),
    scope: text(),
    password: text(),
    createdAt: int().notNull().$default(() => Date.now()),
    updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, table => [index("account_userId_idx").on(table.userId)])

export const verification = sqliteTable("verification", {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: int().notNull(),
    createdAt: int().notNull().$default(() => Date.now()),
    updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, table => [index("verification_identifier_idx").on(table.identifier)])

export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
}))

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}))

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}))
