import Link from "next/link"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const Footer = () => {
  return (
    <div className='w-full'>
        <Separator className="mb-4 w-72 mx-auto"/>
        <div className="flex items-center space-x-2 justify-center">
            <a href="https://www.buymeacoffee.com/masons40" target="_blank">
                <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{height: "40px!important",width: "144px !important;"}} />
            </a>
            <Button asChild>
                <Link href="https://masons40.github.io/" target="_blank">My Website</Link>
            </Button>
        </div>
        <h1 className="text-sm text-muted-foreground text-center mt-4">
            {' '}
            © 2024 All rights reserved
          </h1>

    </div>
  )
}

export default Footer