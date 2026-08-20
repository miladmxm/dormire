import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import type { Role } from "@/constant/appData";

import { authClient } from "@/lib/auth-client";

export const useChangeRole = (userId: string) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChangeRole = (role: Role) => {
    startTransition(async () => {
      const { data, error } = await authClient.admin.setRole({
        userId,
        role,
      });

      if (!data || error)
        toast.error("در تغییر نقش خطا رخ داد", { description: error.message });
      else {
        toast.success("تغییر نقش انجام شد");
        router.refresh();
      }
    });
  };

  return { isPending, handleChangeRole };
};
