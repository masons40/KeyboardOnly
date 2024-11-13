'use client'

import { Keyboard } from "lucide-react"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "~/components/ui/dialog"
import { cn } from "~/lib/utils"
import { Button } from "../ui/button"
import VirtualKeyBoard from "./virtual-keyboard"

export const VirtualKeyboardMobile = ({ className }: { className?: string }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={cn("w-full flex justify-center", className)}>
            <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogTrigger asChild>
                    <Button >
                        <Keyboard className="mr-1 h-4 w-4" />
                        Keyboard
                    </Button>
                </DialogTrigger>
                <DialogContent className="px-0">
                    <DialogTitle className="pl-2 pb-1">Keyboard Area</DialogTitle>
                    <VirtualKeyBoard setOpen={setOpen} />
                </DialogContent>
            </Dialog></div>
    )
}
