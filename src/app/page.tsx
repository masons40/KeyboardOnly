import type { Metadata } from 'next';
import Footer from "~/components/footer/footer";
import Info from "~/components/info";
import VirtualKeyBoard from "~/components/keyboard/virtual-keyboard";
import { VirtualKeyboardMobile } from "~/components/keyboard/virtual-keyboard-mobile";
import Menu from "~/components/menu/menu";
import Messages from "~/components/messages/messages";
import { ModeToggle } from "~/components/mode-toggle";

export const metadata: Metadata = {
  title: 'Keyboard Only',
  description: 'A fun realtime messaging site where users can only type with the keyboard provided on the website.',
}

export default function HomePage() {
  return (
    <div className="flex flex-wrap lg:grid justify-center lg:grid-cols-3 gap-4 h-screen relative">
      <div className="w-full absolute top-0 left-0 p-2 flex items-center space-x-1 justify-between md:w-fit">
        <ModeToggle className={""} />
        <Info />
      </div>
      <div className="col-span-2 hidden lg:grid place-items-center">
        <Menu />
        <VirtualKeyBoard />
        <Footer />
      </div>
      <Menu className="lg:hidden" />
      <Messages />
      <VirtualKeyboardMobile className="lg:hidden" />
      <Footer className="lg:hidden mb-2" />
    </div>
  );
}
