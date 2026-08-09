"use client";

import type { ComponentProps } from "react";

import { useState } from "react";

import CloseEye from "@/assets/icons/closeEye.svg";
import OpenEye from "@/assets/icons/openEye.svg";
import { cn } from "@/lib/utils";

type PasswordFieldProps =
  | { showPassword: undefined; setShowPassword: undefined }
  | {
      showPassword?: boolean;
      setShowPassword?: () => void;
    };

const PasswordField = ({
  className,
  showPassword,
  setShowPassword,
  ...props
}: ComponentProps<"input"> & PasswordFieldProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    if (setShowPassword) {
      setShowPassword();
    } else {
      setIsShowPassword((prev) => !prev);
    }
  };

  const isShow =
    typeof showPassword !== "undefined" ? showPassword : isShowPassword;
  return (
    <div
      className={cn(
        "relative rounded-full text-end placeholder:text-start border border-primary-500 outline-none",
        className,
      )}
    >
      <input
        autoComplete="password"
        placeholder="رمز عبور"
        {...props}
        type={isShow ? "text" : "password"}
        className="p-4 size-full outline-none"
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute inset-e-4 *:size-6 inset-y-0 z-10"
      >
        {isShow ? <CloseEye /> : <OpenEye />}
      </button>
    </div>
  );
};

export default PasswordField;
