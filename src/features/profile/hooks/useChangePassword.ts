import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient, getErrorMessage } from "@/lib/auth-client";

import { ResetPasswordSchema } from "../validations/profile";

export const useChangePassword = () => {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, reset } = useForm({
    resolver: valibotResolver(ResetPasswordSchema),
    defaultValues: { confirmNewPassword: "", newPassword: "", oldPassword: "" },
  });
  const onSubmit = handleSubmit(({ oldPassword, newPassword }) => {
    startTransition(async () => {
      const { error } = await authClient.changePassword({
        currentPassword: oldPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      reset();
      toast.success("رمز عبور تغییر کرد و نشست‌های دیگر بسته شدند");
    });
  });

  return { onSubmit, control, isPending };
};
