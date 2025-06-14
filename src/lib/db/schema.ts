import { boolean, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: varchar('id', {length:255}).primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    isMember: boolean('is_member').notNull().default(false),
    created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),

});

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
    created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),
});

export const studyNotes = pgTable('study_notes', {
    id: varchar('id', {length:255}).primaryKey(),
    studyId: varchar().notNull(),
    chapterId: varchar().notNull(),
    notes: text(),
    created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),

});

export const StudyTypeContent = pgTable('studyTypeContent', {
    id: varchar('id', {length: 255}).primaryKey(),
    studyId: varchar('study_id', {length: 255}).notNull(),
    content: json(),
    type: varchar('type', {length: 50}).notNull(),
    status: varchar('status', {length: 50}).default('Generating'),
    created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),
});
