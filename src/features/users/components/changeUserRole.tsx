import { UserCircleIcon } from "lucide-react";

import type { Role } from "@/constant/appData";

import { Button } from "@/components/dashboard/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dashboard/ui/dialog";
import { Spinner } from "@/components/dashboard/ui/spinner";

import { useChangeRole } from "../hooks/useChangeRole";
import { SelectRole } from "./selectUserRole";

const ChangeUserRole = ({
  id,
  role,
  name,
}: {
  role: Role;
  id: string;
  name: string;
}) => {
  const { handleChangeRole, isPending } = useChangeRole(id);
  const description = `شما درحال تغییر نقش ( سطح دسترسی ) کاربر "${name}" هستید`;
  return (
    <Dialog>
      <DialogTrigger asChild disabled={isPending}>
        <Button
          className="flex w-full"
          size="sm"
          disabled={isPending}
          variant="ghost"
        >
          تغییر نقش کاربر
          {isPending ? <Spinner /> : <UserCircleIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>نقش کاربر را تغییر دهید</DialogTitle>
        </DialogHeader>
        <DialogDescription aria-description={description}>
          {description}
        </DialogDescription>
        <SelectRole
          defaultValue={role}
          isPendign={isPending}
          onValueChange={handleChangeRole}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeUserRole;
