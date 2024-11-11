import { cn } from "~/lib/utils";
import { getAudit } from "~/server/actions/actions";

const Tally = async ({ className }: { className?: string }) => {
    const auditData = await getAudit();
    return (
        <h1 className={cn("text-center font-bold", className)}>Messages sent so far: {auditData?.counter?.toLocaleString() ?? 0}</h1>
    )
}

export default Tally