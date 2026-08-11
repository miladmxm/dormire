"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthFormWrapper from "@/components/ui/auth/form";
import PasswordField from "@/components/ui/auth/password";
import TextField from "@/components/ui/auth/text";
import Button from "@/components/ui/button";
import FormInputError from "@/components/ui/formInputError";
import Spiner from "@/components/ui/spiner";

import type { CompleteRegistrationInput } from "../validation/auth.schema";

import { completeRegistration } from "../actions/auth";
import { resetAuth, useAuthStore } from "../store/auth";
import { CompleteRegistrationSchema } from "../validation/auth.schema";

const CompleteRegistration = ({
  phoneNumber: phoneNumberProp,
}: {
  phoneNumber?: string;
}) => {
  const storedPhoneNumber = useAuthStore((state) => state.phoneNumber);
  const phoneNumber = phoneNumberProp || storedPhoneNumber;
  const router = useRouter();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm<CompleteRegistrationInput>({
    resolver: valibotResolver(CompleteRegistrationSchema),
    defaultValues: { confirmPassword: "", name: "", password: "" },
  });

  const onSubmit = async (input: CompleteRegistrationInput) => {
    try {
      const result = await completeRegistration(input);

      if (!result.success) {
        if (result.errors) {
          const entries = Object.entries(result.errors) as [
            keyof CompleteRegistrationInput,
            string[],
          ][];

          entries.forEach(([field, messages]) => {
            if (messages[0]) setError(field, { message: messages[0] });
          });
        }

        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      resetAuth();
      router.refresh();
    } catch {
      toast.error("تکمیل ثبت‌نام انجام نشد؛ دوباره تلاش کنید");
    }
  };

  return (
    <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-2xl bg-primary-50 px-4 py-3 text-sm leading-6 text-primary-900">
        شماره <span dir="ltr">{phoneNumber}</span> تأیید شد. برای تکمیل حساب،
        مشخصات زیر را وارد کنید.
      </div>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-2">
            <TextField
              autoComplete="name"
              placeholder="نام و نام خانوادگی"
              {...field}
            />
            <FormInputError error={fieldState.error} />
          </div>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-2">
            <PasswordField
              autoComplete="new-password"
              placeholder="رمز عبور (حداقل ۸ کاراکتر)"
              {...field}
            />
            <FormInputError error={fieldState.error} />
          </div>
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-2">
            <PasswordField
              autoComplete="new-password"
              placeholder="تکرار رمز عبور"
              {...field}
            />
            <FormInputError error={fieldState.error} />
          </div>
        )}
      />
      <Button
        className="flex center gap-3"
        disabled={isSubmitting}
        type="submit"
        variant="secondary"
      >
        <span>تکمیل ثبت‌نام</span>
        {isSubmitting && <Spiner />}
      </Button>
    </AuthFormWrapper>
  );
};

export default CompleteRegistration;
