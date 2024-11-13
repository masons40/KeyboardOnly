'use server';

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { audit, chats } from "../db/schema";


export async function getAudit() {
  'use server';

  return await db.query.audit.findFirst({
    where: eq(audit.id, 1),
  });
}

export async function getMessages() {
  'use server';

  const messages = (await db.select().from(chats).orderBy(desc(chats.createdAt)).limit(50)).reverse();
  revalidatePath('/')
  return messages
}

export async function saveMessageAction(message: string) {
    'use server';
    try {
      if (message.replace(/\s/g, "")) {
        const savedMessage = await db.insert(chats)
        .values({
          message: message
        })
        .returning();
          
        if (savedMessage) {
          return true
        }
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      return new Error('Failed to send message')
    }
}