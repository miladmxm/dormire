import type { ComponentProps } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/ui/select";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { USER_ROLES, USER_ROLES_DICTIONARY } from "@/constant/appData";

export const SelectRole = ({
  triggerId,
  isPendign,
  ...props
}: ComponentProps<typeof Select> & {
  triggerId?: string;
  isPendign?: boolean;
}) => {
  return (
    <Select dir="rtl" disabled={isPendign} {...props}>
      <SelectTrigger id={triggerId}>
        <SelectValue placeholder="انتخاب نقش کاربر" />
        {isPendign && <Spinner />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>نقش</SelectLabel>
          {USER_ROLES.map((role) => (
            <SelectItem key={role} value={role}>
              {USER_ROLES_DICTIONARY[role]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
