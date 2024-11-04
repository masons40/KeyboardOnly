CREATE TABLE IF NOT EXISTS "keyboard_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
