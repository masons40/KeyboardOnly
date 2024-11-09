import Image from 'next/image'
import { cn } from '~/lib/utils'
import LogoDark from '../../../public/onlyKeyboardLogoDark.png'
import LogoLight from '../../../public/onlyKeyboardLogoWhite.png'

const Menu = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center space-x-2 w-full justify-center mt-2 md:mt-0', className)}>
      <Image src={LogoDark.src} alt="Keyboard only dark logo" width={40} height={40} className="dark:hidden block" />
      <Image src={LogoLight.src} alt="Keyboard only light logo" width={40} height={40} className="dark:block hidden" />
      <h1 className='text-xl font-bold tracking-tight'>Keyboard Only</h1>
    </div>
  )
}

export default Menu