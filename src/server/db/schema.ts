// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  pgTableCreator,
  serial,
  text,
  timestamp
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `keyboard_${name}`);

export const chats = createTable(
  "chats",
  {
    id: serial("id").primaryKey(),
    message: text("message"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    deleteAt: timestamp('delete_at', {withTimezone: true}).default(sql`NOW() + INTERVAL '1 day'`).notNull()
  },
);


export const audit = createTable(
  "audit",
  {
    id: serial("id").primaryKey(),
    counter: bigint("counter", { mode: 'number' })
  },
);

export type SelectChat = typeof chats.$inferSelect;
export type SelectAudit = typeof audit.$inferSelect;
