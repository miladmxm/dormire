import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import type { CreateUserOutput } from "../validations";

import { CreateUserShema } from "../validations";

export const useCreateUser = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const form = useForm({
    resolver: valibotResolver(CreateUserShema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "customer",
      phoneNumber: "",
      verify: false,
    },
  });

  const submit = ({
    email,
    name,
    password,
    phoneNumber,
    role,
    verify,
  }: CreateUserOutput) => {
    startTransition(async () => {
      const { data, error } = await authClient.admin.createUser({
        email,
        name,
        data: {
          phoneNumber,
          phoneNumberVerified: verify,
          emailVerified: verify,
        },
        password,
        role,
      });

      if (data && !error) {
        toast.success(`کاربر '${name}' با موفقیت ساخته شد`);
        form.reset();
        router.replace("/admin/users");
      } else {
        toast.error("در ایجاد کاربر جدید خطایی رخ داد", {
          description: error.message,
        });
      }
    });
  };

  return {
    onSubmit: form.handleSubmit(submit),
    form,
    isPending,
  };
};
