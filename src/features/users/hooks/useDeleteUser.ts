import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export const useDeleteUser = (userId: string) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const { data, error } = await authClient.admin.removeUser({ userId });

      if (data && !error) {
        toast.info("با موفقیت حذف شد");
        router.refresh();
      } else {
        toast.error("حذف کاربر با خطا مواجه شد", {
          description: error.message,
        });
      }
    });
  };

  return { isPending, handleDelete };
};
