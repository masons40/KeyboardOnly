'use client'

import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type SelectChat } from "~/server/db/schema";
import { createClient } from "~/utils/supabase/client";
import { Button } from "../ui/button";

const MessagesClient = ({ chats }: { chats: SelectChat[] }) => {

  const [messages, setMessages] = useState<SelectChat[]>(chats)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const supabase = createClient();

  const scrollToBottomSmooth = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
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
    scrollToBottomSmooth()

    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      setShowScrollButton(scrollTop < scrollHeight - clientHeight - 20)
    }

    container.addEventListener('scroll', handleScroll)

    return () => {
      void supabase.removeChannel(channel);
      container.removeEventListener('scroll', handleScroll);
    }
  }, [supabase, messages, setMessages]);

  useEffect(() => {
    scrollToBottomSmooth()
  }, [])

  return (<div className="relative w-full h-full overflow-hidden">
    <div className="flex-1 bg-secondary max-h-full h-full rounded-b-lg border flex flex-col space-y-4 p-4 overflow-y-scroll overflow-x-hidden" ref={containerRef}>
      {messages.map((message, index) => {
        return <div key={index} className="flex justify-end">
          <div className="bg-button text-white rounded-lg py-2 px-4 max-w-[80%] text-right">
            <p className="break-words whitespace-pre-wrap">{message.message}</p>
            <p className="text-xs text-muted-foreground mt-1">{message.createdAt.toLocaleString()}</p>
          </div>
        </div>
      }
      )
      }
      {showScrollButton && (
        <div className="absolute bottom-4 w-full md:text-center">
          <Button
            size={'xs'}
            onClick={scrollToBottomSmooth}
            className="rounded-md animate-bounce hover:opacity-90 "
          >
            <ArrowDown size={30} />
          </Button>
        </div>

      )}
    </div>
  </div>
  )
}

export default MessagesClient