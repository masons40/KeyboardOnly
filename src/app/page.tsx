import Footer from "~/components/footer/footer";
import Info from "~/components/info";
import VirtualKeyBoard from "~/components/keyboard/virtual-keyboard";
import { VirtualKeyboardMobile } from "~/components/keyboard/virtual-keyboard-mobile";
import Menu from "~/components/menu/menu";
import Messages from "~/components/messages/messages";
import Tally from "~/components/messages/tally";
import { ModeToggle } from "~/components/mode-toggle";

export default function HomePage() {
  return (
    <div className="flex flex-wrap lg:grid justify-center lg:grid-cols-3 gap-4 h-screen relative">
      <div className="absolute top-2 left-2 flex items-center space-x-1">
        <ModeToggle className={""} />
        <Info />
      </div>
      <div className="col-span-2 hidden lg:grid place-items-center">
        <Menu />
        <Tally />
        <VirtualKeyBoard />
        <Footer />
      </div>
      <Menu className="lg:hidden" />
      <Messages />
      <VirtualKeyboardMobile className="lg:hidden" />
      <Tally className="lg:hidden" />
      <Footer className="lg:hidden mb-2" />
    </div>
  );
}
