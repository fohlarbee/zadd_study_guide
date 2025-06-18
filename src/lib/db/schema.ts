import { boolean, json, numeric, pgTable, text, timestamp, varchar, } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: varchar('id', {length:255}).primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    isMember: boolean('is_member').notNull().default(false),
    customerId: varchar('customer_id', {length: 255}).unique(),
    created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),
});

    // subscriptions: json('subscriptions').$type<string[]>().default([]),

export type DrizzleStudyMaterial = typeof StudyMaterial.$inferSelect;
export const StudyMaterial = pgTable('studyMaterial', {
    id:varchar('id', {length: 255}).primaryKey(),
    courseId: varchar('course_id', {length: 255}).notNull(),
    studyType: varchar('course_type', {length: 255}).notNull(),
    topic: varchar('topic', {length: 255}).notNull(),
    difficulty: varchar('difficulty', {length: 255}).default('Easy'),
    courseLayout: json(),
    status:varchar('status').default('Generating'),
    userId:varchar('user_id').references(() => Users.id, {onDelete: 'cascade'}).notNull(),
    progress:numeric('progress', {mode:'number'}).default(0),
    created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),
});

export const studyNotes = pgTable('study_notes', {
    id: varchar('id', {length:255}).primaryKey(),
    studyId: varchar().notNull(),
    chapterId: varchar().notNull(),
    notes: text(),
    completed: boolean('completed').default(false),
    created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),

});

export const StudyTypeContent = pgTable('studyTypeContent', {
    id: varchar('id', {length: 255}).primaryKey(),
    studyId: varchar('study_id', {length: 255}).notNull(),
    content: json(),
    type: varchar('type', {length: 50}).notNull(),
    status: varchar('status', {length: 50}).default('Generating'),
    completed: boolean('completed').default(false),
    created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),
});


export const subscriptions = pgTable("subscriptions", {
    id: varchar('id', {length: 255}).primaryKey(),
    userId: varchar('user_id', {length:256}).notNull().unique(),
    stripeCustomerId: varchar('stripe_customer_id', {length:256}).notNull().unique(),
    stripeSubscriptionId: varchar('stripe_subscription_id', {length:256}).unique(),
    stripePriceId: varchar('stripe_price_id', {length:256}),
    stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
    sessionId: varchar('session_id', {length: 256}).notNull().unique(),
    created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),

});