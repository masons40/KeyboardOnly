'use server';

import { db } from "../db";
import { chats } from "../db/schema";

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