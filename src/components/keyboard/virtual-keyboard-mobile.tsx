import { Keyboard } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "~/components/ui/dialog"
import { cn } from "~/lib/utils"
import { Button } from "../ui/button"
import VirtualKeyBoard from "./virtual-keyboard"

export const VirtualKeyboardMobile = ({ className }: { className?: string }) => {
    return (
        <div className={cn("w-full flex justify-center", className)}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button >
                        <Keyboard className="mr-1 h-4 w-4" />
                        Keyboard
                    </Button>
                </DialogTrigger>
                <DialogContent className="px-1">
                    <VirtualKeyBoard />
                </DialogContent>
            </Dialog></div>
    )
}
