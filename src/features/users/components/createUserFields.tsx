import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/dashboard/ui/field";
import { Input, PasswordInput } from "@/components/dashboard/ui/input";

import type { CreateUserOutput } from "../validations";

import RandomPassword from "./randomPassword";
import { SelectRole } from "./selectUserRole";

const useCreateUserFormContext = useFormContext<CreateUserOutput>;

export const NameField = () => {
  const { control } = useCreateUserFormContext();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>نام کاربر</FieldLabel>
          <Input
            autoComplete="new"
            {...field}
            id={field.name}
            placeholder="Arman"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const EmailField = () => {
  const { control } = useCreateUserFormContext();
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>ایمیل کاربر</FieldLabel>
          <Input
            dir="ltr"
            type="email"
            {...field}
            id={field.name}
            autoComplete="new"
            placeholder="arman@gmail.com"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const PasswordField = () => {
  const { control, setValue } = useCreateUserFormContext();
  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>رمز عبور کاربر</FieldLabel>
          <div className="flex gap-2">
            <RandomPassword
              onClick={(pass) => {
                setValue("password", pass);
              }}
            />
            <PasswordInput
              {...field}
              dir="ltr"
              className="flex-1"
              id={field.name}
              autoComplete="new-password"
            />
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const RoleSelector = () => {
  const { control } = useCreateUserFormContext();
  return (
    <Controller
      name="role"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>انتخاب نقش کاربر</FieldLabel>
          <SelectRole
            triggerId={field.name}
            value={field.value}
            onValueChange={field.onChange}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
