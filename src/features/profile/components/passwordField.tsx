import type { ComponentProps } from "react";

import PasswordField from "@/components/ui/auth/password";

const PasswordFieldWithLabel = ({
  label,
  ...props
}: ComponentProps<typeof PasswordField> & { label: string; name: string }) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
      {label}
      <PasswordField {...props} />
    </label>
  );
};

export default PasswordFieldWithLabel;
