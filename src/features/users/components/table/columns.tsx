import type { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";

import type { User } from "@/services/users/type";

import { Button } from "@/components/dashboard/ui/button";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "شناسه کاربر",
    cell: ({ row }) => (
      <Button asChild size="sm" variant="link">
        <Link href={`/admin/users/${row.original.id}`}>
          <span dir="ltr">#{row.original.id}</span>
        </Link>
      </Button>
    ),
  },
];

export const userColumnLabels: Record<string, string> = {
  id: "شناسه کاربر",
};
