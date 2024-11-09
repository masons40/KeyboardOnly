'use client'

import { useEffect, useRef, useState } from "react";
import { type SelectChat } from "~/server/db/schema";
import { createClient } from "~/utils/supabase/client";
import { ScrollArea } from "../ui/scroll-area";

const MessagesClient = ({ chats }: { chats: SelectChat[] }) => {

  const [messages, setMessages] = useState<SelectChat[]>(chats)
  const containerRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView({
      behavior: 'smooth', block: 'end',
      inline: 'nearest',
    })
  }


  useEffect(() => {
    const channel = supabase.channel('realtime chats').on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'keyboard_chats'
    }, (payload) => {
      const p: SelectChat = {
        id: Math.random(),
        message: payload.new.message as string,
        createdAt: new Date(payload.new.created_at as string),
        deleteAt: new Date(payload.new.delete_at as string)
      }
      setMessages([...messages, p])

    }).subscribe()
    scrollToBottom()
    return () => {
      void supabase.removeChannel(channel)
    }
  }, [supabase, messages, setMessages])

  return (
    <ScrollArea className="flex-1 bg-secondary p-2 max-h-full h-full rounded-lg border" id="chat">
      <div className="flex flex-col space-y-4 p-4" ref={containerRef}>
        {messages.map((message, index) => {
          return <div key={index} className="flex justify-end">
            <div className="bg-button text-white rounded-lg py-2 px-4 max-w-[80%] text-right">
              <p className="break-words whitespace-pre-wrap">{message.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{message.createdAt.toLocaleString()}</p>
            </div>
          </div>
        }
        )}
      </div>
    </ScrollArea>
  )
}

export default MessagesClient