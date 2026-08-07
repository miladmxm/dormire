import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient, getErrorMessage } from "@/lib/auth-client";

import {
  UpdateEmailSchema,
  UpdateFullnameSchema,
} from "../validations/profile";

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

export const useUpdateEmail = ({ email }: { email: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(UpdateEmailSchema),
    defaultValues: { email },
  });
  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      const { error } = await authClient.changeEmail({ newEmail: input.email });

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      router.refresh();
      toast.success("درخواست تغییر ایمیل برای شما ارسال شد", {
        description:
          "برای تکمیل تغییرات ، در صندوق ورودی ایمیل خود بر روی لینک ارسال شده کلیک کنید ",
      });
    });
  });
  return {
    onSubmit,
    control,
    isPending,
  };
};
