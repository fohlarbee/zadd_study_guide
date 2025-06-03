import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: varchar('id', {length:255}).primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    isMember: boolean('is_member').notNull().default(false),
    createdAt: varchar('created_at', {length: 255}).notNull().default('now()'),

})