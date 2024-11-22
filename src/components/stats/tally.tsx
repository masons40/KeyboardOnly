/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { getAudit } from "~/server/actions/actions";
import { Badge } from "../ui/badge";
import NumberTicker from "../ui/number-ticker";

const Tally = ({ className }: { className?: string }) => {
    const [counter, setCounter] = useState<number>(0)

    useEffect(() => {
        const fetchCounter = async () => {
            const count = await getAudit() ?? 0
            if (count && count.counter) setCounter(count.counter)
        }

        // Fetch immediately on mount
        void fetchCounter()

        // Set up interval to fetch every 30 seconds
        const intervalId = setInterval(fetchCounter, 30000)

        // Clean up interval on component unmount
        return () => clearInterval(intervalId)
    }, [])
    return (
        <Badge className={cn("", className)}>Total Messages: <NumberTicker value={counter} className="text-black ml-1" /></Badge>
    )
}

export default Tally