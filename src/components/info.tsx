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
                        Description
                    </DialogDescription>
                </DialogHeader>
                <p>
                    This is a realtime messaging project where users can only type with the keyboard provided on the website.
                    Messages are automatically deleted 24 hours after posting. All messages are anonymous.
                </p>
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