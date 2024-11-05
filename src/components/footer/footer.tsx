import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const Footer = () => {
  return (
    <div className='w-full'>
      <div className="flex items-center space-x-2 justify-center">
        <a href="https://www.buymeacoffee.com/masons40" target="_blank">
          <Image src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width={144} height={40} />
        </a>
        <Button asChild>
          <Link href="https://masons40.github.io/" target="_blank">My Website</Link>
        </Button>
      </div>
      <h1 className="text-sm text-muted-foreground text-center mt-4">
        Keyboard Only © 2024 All rights reserved
      </h1>

    </div>
  )
}

export default Footer