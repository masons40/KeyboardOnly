import { cn } from "~/lib/utils";
import { getAudit } from "~/server/actions/actions";
import { Badge } from "../ui/badge";

const Tally = async ({ className }: { className?: string }) => {
    const auditData = await getAudit();
    return (
        <Badge className={cn("", className)}>Total Messages: {auditData?.counter?.toLocaleString() ?? 0}</Badge>
    )
}

export default Tally