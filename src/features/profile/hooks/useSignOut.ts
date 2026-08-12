import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { authClient, getErrorMessage } from "@/lib/auth-client";

export const useSignOut = () => {
  const [isPendign, startTransition] = useTransition();
  const router = useRouter();

  const signOut = async () => {
    startTransition(async () => {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      router.push("/");
      router.refresh();
    });
  };

  return { signOut, isPendign };
};
