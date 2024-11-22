import { InfoIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

const Info = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size={'icon'}>
                    <InfoIcon className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Keyboard Only</DialogTitle>
                    <DialogDescription>
                        About
                    </DialogDescription>
                </DialogHeader>
                <ul className="text-sm text-muted-foreground space-y-1">
                    <li>This is a realtime messaging project where users can only type with the keyboard provided on the website.</li>
                    <li>Messages are automatically deleted 24 hours after posting and messages are anonymous.</li>
                    <li>Diacritics and Accent characters can be found by holding down the button.</li>
                    <li>Feature ideas or problems? <br />Email here: <br /><a href="mailto:admin@keyboard-only.com" className="text-blue-300">admin@keyboard-only.com</a></li>
                </ul>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Info