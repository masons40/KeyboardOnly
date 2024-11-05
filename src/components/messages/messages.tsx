import { db } from "~/server/db";
import { chats } from "~/server/db/schema";
import MessagesClient from "./messages-client";

const Messages = async () => {
  const messages = await db.select().from(chats);
  console.log("name: ", chats.getSQL())
  console.log("messages: ", messages)
  return (
    <div className="py-2 pr-2 h-screen w-full"><MessagesClient chats={messages ?? []} /></div>
  )
}

export default Messages