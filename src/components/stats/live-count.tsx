/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { createClient } from "~/utils/supabase/client";
import { Badge } from "../ui/badge";

const LiveCount = ({ className }: { className?: string }) => {

    const [onlineUsers, setOnlineUsers] = useState<number>(0);
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase.channel('room1')
        channel
            .on('presence', { event: 'sync' }, () => {
                setOnlineUsers(Object.keys(channel.presenceState()).length)
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({ online_at: new Date().toISOString() })
                }
            })

        return async () => {
            await channel.unsubscribe()
        }

    }, [supabase, setOnlineUsers]);

    return (
        <Badge className={cn("text-green-500 border-green-500", className)} variant={'outline'} >Online: {onlineUsers}</Badge>
    );
}

export default LiveCount