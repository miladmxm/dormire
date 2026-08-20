import { Trash } from "lucide-react";

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

import { useDeleteUser } from "../hooks/useDeleteUser";

const DeleteButton = ({ id, name }: { name: string; id: string }) => {
  const { handleDelete, isPending } = useDeleteUser(id);
  return (
    <Dialog>
      <DialogTrigger asChild disabled={isPending}>
        <Button
          size="sm"
          className="text-destructive w-full flex"
          disabled={isPending}
          variant="ghost"
        >
          حذف
          {isPending ? <Spinner /> : <Trash />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>از انجام این عملیات اطمینان دارید؟</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          شما در حال حذف کردن "{name}" هستید
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete}>
              تایید
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
