import { useTransition } from "react";
import { toast } from "sonner";

import { authClient, getErrorMessage } from "@/lib/auth-client";

export const useRevorkeSessions = () => {
  const [isRevoking, startTransition] = useTransition();

  const revokeOtherSessions = async () => {
    startTransition(async () => {
      const { error } = await authClient.revokeOtherSessions();

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      toast.success("از تمام دستگاه‌های دیگر خارج شدید");
    });
  };

  return { revokeOtherSessions, isRevoking };
};
