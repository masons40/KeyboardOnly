import Image from 'next/image'
import LogoDark from '../../../public/onlyKeyboardLogoDark.png'
import LogoLight from '../../../public/onlyKeyboardLogoWhite.png'

const Menu = () => {
  return (
    <div className='flex items-center space-x-2'>
      <Image src={LogoDark.src} alt="Keyboard only dark logo" width={40} height={40} className="dark:hidden block" />
      <Image src={LogoLight.src} alt="Keyboard only light logo" width={40} height={40} className="dark:block hidden" />
      <h1 className='text-xl font-bold tracking-tight'>Keyboard Only</h1>
    </div>
  )
}

export default Menu