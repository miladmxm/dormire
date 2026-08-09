import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { setUserPasswordAction } from "../actions/password";
import { NewPasswordSchema } from "../validations/profile";

export const useSetPassword = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(NewPasswordSchema),
    defaultValues: { confirmNewPassword: "", newPassword: "" },
  });
  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      const { success, message } = await setUserPasswordAction(input);

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        router.refresh();
      }
    });
  });
  return { onSubmit, control, isPending };
};
