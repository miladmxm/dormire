import type { ComponentProps, PropsWithChildren } from "react";

import PasswordField from "@/components/ui/auth/password";

const PasswordFieldWithLabel = ({
  label,
  children,
  ...props
}: ComponentProps<typeof PasswordField> &
  PropsWithChildren<{ label: string; name: string }>) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
      {label}
      <PasswordField {...props} />
      {children}
    </label>
  );
};

export default PasswordFieldWithLabel;
