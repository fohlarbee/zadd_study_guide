CREATE TABLE "studyMaterial" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"course_id" varchar(255) NOT NULL,
	"course_type" varchar(255) NOT NULL,
	"topic" varchar(255) NOT NULL,
	"difficulty" varchar(255) DEFAULT 'Easy',
	"courseLayout" json,
	"status" varchar DEFAULT 'Generating',
	"user_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);


--> statement-breakpoint
CREATE TABLE "studyTypeContent" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"study_id" varchar(255) NOT NULL,
	"content" json,
	"type" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'Generating',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"is_member" boolean DEFAULT false NOT NULL,
	"created_at" varchar(255) DEFAULT 'now()' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "study_notes" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"studyId" varchar NOT NULL,
	"chapterId" varchar NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "studyMaterial" ADD CONSTRAINT "studyMaterial_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;



