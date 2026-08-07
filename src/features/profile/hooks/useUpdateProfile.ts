import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient, getErrorMessage } from "@/lib/auth-client";

import { UpdateFullnameSchema } from "../validations/profile";

export const useUpdateFullname = ({ name }: { name: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit, reset } = useForm({
    resolver: valibotResolver(UpdateFullnameSchema),
    defaultValues: { fullname: name },
  });
  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      const { error } = await authClient.updateUser({ name: input.fullname });

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      router.refresh();
      toast.success("اطلاعات حساب به‌روزرسانی شد");
      reset(input);
    });
  });
  return {
    onSubmit,
    control,
    isPending,
  };
};
