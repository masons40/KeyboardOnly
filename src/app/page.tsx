import { eq } from "drizzle-orm";
import Footer from "~/components/footer/footer";
import VirtualKeyBoard from "~/components/keyboard/virtual-keyboard";
import Menu from "~/components/menu/menu";
import Messages from "~/components/messages/messages";
import { ModeToggle } from "~/components/mode-toggle";
import { db } from "~/server/db";
import { audit } from "~/server/db/schema";

export default async function HomePage() {
  const auditData = await db.query.audit.findFirst({
    where: eq(audit.id, 1),
  });
  console.log("audit data: ", auditData)
  return (
    <div className="grid grid-cols-3 gap-4 h-screen relative">
      <ModeToggle className={"absolute top-2 left-2"} />
      <div className="col-span-2 grid place-items-center">
        <Menu />
        <VirtualKeyBoard count={auditData?.counter ?? 0} />
        <Footer />
      </div>
      <Messages />
    </div>
  );
}
