import { KeyRound } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

import FormInputError from "@/components/ui/formInputError";

import { useChangePassword } from "../hooks/useChangePassword";
import PasswordFieldWithLabel from "./passwordField";

const ChangePassword = () => {
  const { control, isPending, onSubmit } = useChangePassword();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <form
      className="rounded-4xl border border-primary-300 bg-white p-5 sm:p-7"
      onSubmit={onSubmit}
    >
      <div className="mb-6 flex items-center gap-4 border-b border-primary-200 pb-6">
        <div className="center size-12 rounded-2xl bg-secondary-500/10 text-secondary-600">
          <KeyRound className="size-5" />
        </div>
        <div>
          <h3 className="font-black text-gray-900">تغییر رمز عبور</h3>
          <p className="mt-1 text-xs leading-5 text-primary-900">
            حداقل 8 کاراکتر؛ ترجیحاً ترکیبی از حروف، عدد و نشانه‌ها.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="oldPassword"
          render={({ field, fieldState }) => (
            <div className="sm:col-span-2 flex flex-col gap-2">
              <PasswordFieldWithLabel
                showPassword={showPassword}
                setShowPassword={toggleShowPassword}
                label="رمز فعلی"
                {...field}
                autoComplete="current-password"
              />
              <FormInputError error={fieldState.error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <PasswordFieldWithLabel
                showPassword={showPassword}
                setShowPassword={toggleShowPassword}
                label="رمز جدید"
                {...field}
              />
              <FormInputError error={fieldState.error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <PasswordFieldWithLabel
                showPassword={showPassword}
                setShowPassword={toggleShowPassword}
                label="تکرار رمز جدید"
                {...field}
              />
              <FormInputError error={fieldState.error} />
            </div>
          )}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="rounded-full bg-secondary-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-secondary-600 disabled:cursor-wait disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "در حال تغییر..." : "تغییر رمز"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
