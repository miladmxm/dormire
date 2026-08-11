import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const TextField = ({ className, ...props }: ComponentProps<"input">) => (
  <input
    className={cn(
      "w-full rounded-full border border-primary-500 p-4 outline-none transition focus:border-secondary-500",
      className,
    )}
    {...props}
  />
);

export default TextField;
