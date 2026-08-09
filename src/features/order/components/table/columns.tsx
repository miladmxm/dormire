import type { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/dashboard/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";

import type { AdminOrderListItem } from "../../types";

import {
  formatOrderCurrency,
  formatOrderDate,
  getShortOrderId,
} from "../../utils";
import OrderStatusMenu from "../orderStatusMenu";

const SortableHeader = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <Button size="sm" variant="ghost" onClick={onClick}>
    {label}
    <ArrowUpDown data-icon="inline-end" />
  </Button>
);

export const orderColumns: ColumnDef<AdminOrderListItem>[] = [
  {
    accessorKey: "id",
    header: "شماره سفارش",
    cell: ({ row }) => (
      <Button asChild size="sm" variant="link">
        <Link href={`/admin/orders/${row.original.id}`}>
          <span dir="ltr">#{getShortOrderId(row.original.id)}</span>
        </Link>
      </Button>
    ),
  },
  {
    id: "customer",
    accessorFn: (order) => order.user.name,
    header: ({ column }) => (
      <SortableHeader
        label="مشتری"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-52 flex-col gap-1">
        <span className="truncate font-medium">{row.original.user.name}</span>
        <span className="text-muted-foreground truncate text-xs" dir="ltr">
          {row.original.user.phoneNumber ?? row.original.user.email}
        </span>
      </div>
    ),
  },
  {
    id: "items",
    accessorFn: (order) =>
      order.items.reduce((total, item) => total + item.quantity, 0),
    header: "تعداد کالا",
    cell: ({ row }) => (
      <span>{row.getValue<number>("items").toLocaleString("fa-IR")} عدد</span>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <SortableHeader
        label="مبلغ کل"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        {formatOrderCurrency(row.original.totalPrice)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => (
      <OrderStatusMenu id={row.original.id} status={row.original.status} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader
        label="تاریخ ثبت"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => <time>{formatOrderDate(row.original.createdAt)}</time>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="عملیات سفارش" size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>عملیات</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/admin/orders/${row.original.id}`}>
                <Eye />
                مشاهده جزئیات
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export const orderColumnLabels: Record<string, string> = {
  id: "شماره سفارش",
  customer: "مشتری",
  items: "تعداد کالا",
  totalPrice: "مبلغ کل",
  status: "وضعیت",
  createdAt: "تاریخ ثبت",
};
