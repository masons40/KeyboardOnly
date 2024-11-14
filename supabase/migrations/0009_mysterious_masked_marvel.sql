ALTER TABLE "keyboard_chats" ALTER COLUMN "message" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "keyboard_chats" ALTER COLUMN "delete_at" SET DEFAULT NOW() + INTERVAL '1 day';