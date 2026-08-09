"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";

import AuthFormWrapper from "@/components/ui/auth/form";
import PasswordField from "@/components/ui/auth/password";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import FormInputError from "@/components/ui/formInputError";
import Spiner from "@/components/ui/spiner";

import { useSetPassword } from "../hooks/useSetPassword";

const SetPassword = () => {
  // todo send verify OTP
  const { control, onSubmit, isPending } = useSetPassword();
  const [isShow, setIsShow] = useState(false);
  const toggleIsShow = () => setIsShow((prev) => !prev);
  return (
    <AuthFormWrapper onSubmit={onSubmit}>
      <Controller
        control={control}
        name="newPassword"
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-2">
            <PasswordField
              showPassword={isShow}
              setShowPassword={toggleIsShow}
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
            <PasswordField
              showPassword={isShow}
              setShowPassword={toggleIsShow}
              {...field}
              placeholder="تکرار رمز عبور"
            />
            <FormInputError error={fieldState.error} />
          </div>
        )}
      />
      <Button
        variant="secondary"
        disabled={isPending}
        className="flex center gap-3"
      >
        <span>تایید</span>
        {isPending && <Spiner />}
      </Button>
    </AuthFormWrapper>
  );
};

const OnlySetPassword = () => {
  return (
    <Dialog
      isOpen
      title="رمز عبور خود را تنظیم کنید"
      key="password"
      onClose={() => {
        console.log("nok");
      }}
    >
      <SetPassword />
    </Dialog>
  );
};

export default OnlySetPassword;
