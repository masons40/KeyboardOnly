import { getMessages } from "~/server/actions/actions";
import LiveCount from "../stats/live-count";
import Tally from "../stats/tally";
import MessagesClient from "./messages-client";

const Messages = async () => {
  const messages = await getMessages();
  return (
    <div className="p-0 md:pr-2 py-2 h-1/2 w-11/12 md:w-11/12 lg:h-screen lg:w-full mx-auto grid">
      <div className="flex justify-between space-x-1 items-center w-full p-3 bg-gray-200 dark:bg-zinc-700 border rounded-t-lg shadow-xl">
        <LiveCount />
        <Tally />
      </div>
      <MessagesClient chats={messages ?? []} />
    </div>
  )
}

export default Messages