import { LogOut, MonitorSmartphone } from "lucide-react";

import { useRevorkeSessions } from "../hooks/useRevorkeSessions";
import { useSignOut } from "../hooks/useSignOut";
import SecurityActionCard from "./securityActionCard";

const SessionsController = () => {
  const { isPendign, signOut } = useSignOut();

  const { isRevoking, revokeOtherSessions } = useRevorkeSessions();

  return (
    <>
      <SecurityActionCard
        action={revokeOtherSessions}
        actionLabel={isRevoking ? "در حال خروج..." : "خروج از سایر دستگاه‌ها"}
        description="اگر دستگاهی را نمی‌شناسید، همه نشست‌ها به‌جز همین دستگاه را ببندید."
        disabled={isRevoking}
        icon={MonitorSmartphone}
        title="دستگاه‌های فعال"
      />
      <SecurityActionCard
        action={signOut}
        actionLabel="خروج"
        disabled={isPendign}
        description="نشست این دستگاه پایان می‌یابد و سبد خرید ذخیره‌شده باقی می‌ماند."
        icon={LogOut}
        title="خروج از حساب"
      />
    </>
  );
};

export default SessionsController;
