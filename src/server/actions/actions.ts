'use server';

import { eq } from "drizzle-orm";
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

  const messages = await db.select().from(chats).orderBy(chats.createdAt).limit(20);
  revalidatePath('/')
  return messages
}

export async function saveMessageAction(message: string) {
    'use server';

    const savedMessage = await db.insert(chats)
    .values({
      message: message
    })
    .returning();
      
    if (savedMessage) {
      return true
    }
    return new Error('fail');
}