import { getMessages } from "~/server/actions/actions";
import MessagesClient from "./messages-client";

const Messages = async () => {
  const messages = await getMessages();
  return (
    <div className="py-2 pr-2 h-screen w-full">
      <MessagesClient chats={messages ?? []} />
    </div>
  )
}

export default Messages