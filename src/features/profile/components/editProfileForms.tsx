import type { ComponentProps, PropsWithChildren } from "react";
import type { FieldError } from "react-hook-form";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Controller } from "react-hook-form";

import FormInputError from "@/components/ui/formInputError";
import Spiner from "@/components/ui/spiner";
import { cn } from "@/lib/utils";

import { useUpdateEmail, useUpdateFullname } from "../hooks/useUpdateProfile";

const inputClassName =
  "w-full rounded-2xl border border-primary-300 bg-primary-25 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-primary-600/60 focus:border-secondary-500 focus:bg-white focus:ring-4 focus:ring-secondary-500/10 disabled:cursor-not-allowed disabled:opacity-70";

export const IdentityField = ({
  isVerified,
  label,
  children,
  errors,
  field: { className, ...field },
}: PropsWithChildren<{
  isVerified: boolean;
  label: string;
  errors?: FieldError;
  field: ComponentProps<"input">;
}>) => (
  <label className="text-sm font-bold text-gray-700 flex flex-col gap-2">
    {label}
    <div className="relative">
      <input
        className={cn(
          inputClassName,
          "dir-ltr text-left",
          {
            "border-success": isVerified,
          },
          className,
        )}
        {...field}
      />
      {children}
    </div>
    <FormInputError error={errors} />
  </label>
);

const SubmitButton = ({
  isDirty,
  isPending,
  className,
}: {
  isDirty: boolean;
  isPending: boolean;
  className?: string;
}) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0, rotate: 30 }}
      animate={isDirty ? { scale: 1, opacity: 1, rotate: 0 } : {}}
      disabled={!isDirty}
      type="submit"
      className={cn("inset-e-2 absolute size-6 top-3", className)}
    >
      {isPending ? <Spiner /> : <Check className="size-full" />}
    </motion.button>
  );
};

export const EditFullname = (props: { name: string }) => {
  const { control, onSubmit, isPending } = useUpdateFullname(props);
  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="fullname"
        render={({ field, fieldState }) => (
          <IdentityField
            label="نام و نام خانوادگی"
            errors={fieldState.error}
            field={{ ...field, className: "dir-rtl text-right" }}
            isVerified
          >
            <SubmitButton isDirty={fieldState.isDirty} isPending={isPending} />
          </IdentityField>
        )}
      />
    </form>
  );
};

export const EditEmail = ({
  email,
  isVerified,
}: {
  email: string;
  isVerified: boolean;
}) => {
  const { control, onSubmit, isPending } = useUpdateEmail({ email });
  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <IdentityField
            label="ایمیل"
            errors={fieldState.error}
            field={field}
            isVerified={isVerified}
          >
            <SubmitButton
              className="dir-ltr"
              isDirty={fieldState.isDirty}
              isPending={isPending}
            />
          </IdentityField>
        )}
      />
    </form>
  );
};
