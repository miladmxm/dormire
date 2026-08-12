import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient, getErrorMessage } from "@/lib/auth-client";

import { DeleteAccountSchema } from "../validations/profile";

export const useDeleteAccount = () => {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, reset } = useForm({
    resolver: valibotResolver(DeleteAccountSchema),
    defaultValues: { confirm: "", deletePassword: "" },
  });

  const onSubmit = handleSubmit(({ deletePassword }) => {
    startTransition(async () => {
      const { error } = await authClient.deleteUser({
        password: deletePassword,
      });

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      window.location.assign("/");
    });
  });
  return { onSubmit, isPending, control, reset };
};
