"use client";

import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Columns3 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/dashboard/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/dashboard/ui/empty";
import { Input } from "@/components/dashboard/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/ui/table";
import { useDirection } from "@/hooks/useDirection";
import { orderStatuses } from "@/services/shipping/type";

import type { AdminOrderListItem } from "../../types";

import { orderStatusDetails } from "../../constants";
import { orderColumnLabels, orderColumns } from "./columns";

// eslint-disable-next-line max-lines-per-function
const OrderTable = ({ data }: { data: AdminOrderListItem[] }) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const dir = useDirection();

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: orderColumns,
    state: { columnFilters, columnVisibility, globalFilter, sorting },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const query = filterValue.trim().toLocaleLowerCase("fa");
      if (!query) return true;

      const order = row.original;
      return [
        order.id,
        order.user.name,
        order.user.email,
        order.user.phoneNumber,
        order.address.fullname,
        order.address.phoneNumber,
        order.address.province,
        order.address.city,
      ].some((value) => value?.toLocaleLowerCase("fa").includes(query));
    },
  });

  const statusFilter =
    (table.getColumn("status")?.getFilterValue() as string | undefined) ??
    "all";

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <Input
          className="lg:max-w-sm"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="جست‌وجوی شماره سفارش، مشتری یا شهر..."
        />
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="w-full lg:w-52">
            <SelectValue placeholder="همه وضعیت‌ها" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="all">همه وضعیت‌ها</SelectItem>
              {orderStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {orderStatusDetails[status].label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DropdownMenu dir={dir}>
          <DropdownMenuTrigger asChild>
            <Button className="lg:ms-auto" variant="outline">
              <Columns3 data-icon="inline-start" />
              ستون‌ها
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    checked={column.getIsVisible()}
                    key={column.id}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(Boolean(value))
                    }
                  >
                    {orderColumnLabels[column.id] ?? column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={orderColumns.length}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Columns3 />
                      </EmptyMedia>
                      <EmptyTitle>سفارشی با این فیلتر پیدا نشد</EmptyTitle>
                      <EmptyDescription>
                        عبارت جست‌وجو یا وضعیت انتخاب‌شده را تغییر دهید.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-sm">
          نمایش {table.getRowModel().rows.length.toLocaleString("fa-IR")} از{" "}
          {table.getFilteredRowModel().rows.length.toLocaleString("fa-IR")}{" "}
          سفارش
        </p>
        <div className="flex gap-2 sm:ms-auto">
          <Button
            disabled={!table.getCanPreviousPage()}
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
          >
            قبلی
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
          >
            بعدی
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
