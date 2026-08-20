import { Lock, LockKeyholeOpen } from "lucide-react";

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
import { cn } from "@/lib/utils";

import { useToggleBan } from "../hooks/useToggleBan";

const ToggleBanUser = ({
  banned,
  id,
  name,
}: {
  id: string;
  banned: boolean | null;
  name: string;
}) => {
  const { handleToggleBan, isPending } = useToggleBan({ userId: id, banned });
  const description = banned
    ? `شما درحال باز کردن حساب کاربری "${name}" هستید`
    : `شما درحال مسدود کردن حساب کاربری "${name}" هستید`;
  const buttonContent = banned ? "آزاد کردن حساب" : "مسدود کردن حساب";
  return (
    <Dialog>
      <DialogTrigger asChild disabled={isPending}>
        <Button
          size="sm"
          disabled={isPending}
          variant="ghost"
          className={cn("flex w-full", {
            "text-destructive": !banned,
            "text-primary": !!banned,
          })}
        >
          {buttonContent}
          {isPending ? <Spinner /> : banned ? <LockKeyholeOpen /> : <Lock />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>از انجام این عملیات اطمینان دارید؟</DialogTitle>
        </DialogHeader>
        <DialogDescription aria-description={description}>
          {description}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={banned ? "default" : "destructive"}
              onClick={handleToggleBan}
            >
              تایید
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleBanUser;
