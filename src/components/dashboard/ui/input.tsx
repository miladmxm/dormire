import { EyeClosedIcon, EyeIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

function PasswordInput({
  className,
  wrapperClassName,
  ...props
}: Omit<
  React.ComponentProps<"input"> & { wrapperClassName?: string },
  "type"
>) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  return (
    <div className={cn("relative", wrapperClassName)}>
      <input
        type={showPassword ? "text" : "password"}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pe-10",
          className,
        )}
        {...props}
      />
      <button
        className="absolute right-3 top-1.5 cursor-pointer"
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
      </button>
    </div>
  );
}

function PhoneNumberInput({
  className,
  wrapperClassName,
  prefix,
  ...props
}: Omit<
  React.ComponentProps<"input"> & {
    wrapperClassName?: string;
    prefix?: number | string;
  },
  "type"
>) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      {prefix && (
        <span className="absolute left-3 text-left top-1.5 cursor-none w-8">
          {prefix}
        </span>
      )}
      <input
        type="tel"
        data-slot="input"
        className={cn(
          "ps-8 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input, PasswordInput, PhoneNumberInput };
