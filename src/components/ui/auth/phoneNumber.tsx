import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const PhoneNumberField = ({ className, ...props }: ComponentProps<"input">) => {
  return (
    <div
      className={cn(
        "rounded-full border border-primary-500  has-[input:focus]:before:hidden flex relative items-center",
        className,
      )}
    >
      <input
        autoComplete="tel-national"
        inputMode="numeric"
        placeholder="شماره تلفن"
        className="flex-auto dir-ltr placeholder:text-end outline-none p-4"
        {...props}
      />
      <span className="me-4">09</span>
    </div>
  );
};

export default PhoneNumberField;
