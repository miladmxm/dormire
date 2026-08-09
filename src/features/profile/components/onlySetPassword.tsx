"use client";

import { Controller } from "react-hook-form";

import PasswordField from "@/components/ui/auth/password";
import Dialog from "@/components/ui/dialog";

import { useSetPassword } from "../hooks/useSetPassword";

const SetPassword = () => {
  const { control, onSubmit } = useSetPassword();
  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="newPassword"
        render={({ field, fieldState }) => <PasswordField />}
      />
    </form>
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
