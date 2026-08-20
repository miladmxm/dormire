import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export const useToggleBan = ({
  banned,
  userId,
}: {
  userId: string;
  banned: boolean | null;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleBan = () => {
    startTransition(async () => {
      const { data } = banned
        ? await authClient.admin.unbanUser({ userId })
        : await authClient.admin.banUser({ userId });

      if (data) {
        toast.info(banned ? "با موفقیت باز شد" : "با موفقیت مسدود شد");
        router.refresh();
      } else {
        toast.error(
          banned
            ? "امکان باز کردن این حساب نیست"
            : "امکان مسدود کردن این کاربر نیست",
        );
      }
    });
  };

  return { isPending, handleToggleBan };
};
