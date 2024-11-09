import { getMessages } from "~/server/actions/actions";
import MessagesClient from "./messages-client";

const Messages = async () => {
  const messages = await getMessages();
  return (
    <div className="py-2 pr-2 h-1/2 w-11/12 md:w-11/12 lg:h-screen lg:w-full mx-auto">
      <MessagesClient chats={messages ?? []} />
    </div>
  )
}

export default Messages