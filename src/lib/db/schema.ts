import { boolean, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: varchar('id', {length:255}).primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    isMember: boolean('is_member').notNull().default(false),
    createdAt: varchar('created_at', {length: 255}).notNull().default('now()'),

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
});