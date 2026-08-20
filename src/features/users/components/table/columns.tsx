import type { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import type { User } from "@/services/users/type";

import { Badge } from "@/components/dashboard/ui/badge";
import { Button } from "@/components/dashboard/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/dashboard/ui/tooltip";
import { fullDateWithFormat } from "@/utils/fullDateWithFormat";

import ChangeUserRole from "../changeUserRole";
import ToggleBanUser from "../toggleBanUser";

export const userColumns = (adminId: string): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    header: "شناسه کاربر",
    cell: ({ row }) => (
      <Button asChild size="sm" variant="link">
        <Link href={`/admin/users/${row.original.id}`}>
          <span dir="ltr">#{row.original.id.slice(0, 8)}</span>
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: "نام و نام خانوادگی",
    cell: ({
      row: {
        original: { banned, name },
      },
    }) => {
      if (!banned) {
        return <span>{name}</span>;
      }

      return (
        <Tooltip>
          <TooltipTrigger>
            <del className="text-destructive">{name}</del>
          </TooltipTrigger>
          <TooltipContent>کاربر مسدود شده است</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "شماره تلفن",
    cell: ({ row }) => {
      const { phoneNumber, phoneNumberVerified } = row.original;

      if (!phoneNumber) {
        return <span>-</span>;
      }

      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge variant={phoneNumberVerified ? "outline" : "destructive"}>
              <a className="dir-ltr" href={`tel:${phoneNumber}`}>
                {phoneNumber}
              </a>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            {phoneNumberVerified ? "احراز هویت شده" : "احراز هویت نشده"}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "email",
    header: "ایمیل",
    cell: ({ row }) => {
      const { email, emailVerified } = row.original;
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge variant={emailVerified ? "outline" : "destructive"}>
              <a className="dir-ltr" href={`mailto:${email}`}>
                {email}
              </a>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            {emailVerified ? "احراز هویت شده" : "احراز هویت نشده"}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ثبت نام",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const dateString = fullDateWithFormat(createdAt, "fa-ir");
      return <time>{dateString}</time>;
    },
  },

  {
    id: "actions",
    header: "عملیات",
    cell: ({
      row: {
        original: { banned, id, name, role },
      },
    }) => {
      if (adminId === id) {
        return <span>-</span>;
      }

      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>عملیات</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {role !== "admin" && (
              <DropdownMenuItem asChild>
                <ToggleBanUser banned={banned} id={id} name={name} />
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <ChangeUserRole id={id} name={name} role={role} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const userColumnLabels: Partial<Record<"actions" | keyof User, string>> =
  {
    id: "شناسه کاربر",
    phoneNumber: "شماره تلفن",
    name: "نام",
    email: "ایمیل",
    createdAt: "تاریخ ثبت نام",
    actions: "عملیات",
  };
