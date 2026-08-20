import { headers } from "next/headers";
import "server-only";

import { auth } from "@/lib/auth";

import type { User } from "./type";

export const getAllUsers = async () => {
  const { users } = await auth.api.listUsers({
    headers: await headers(),
    query: {
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  });
  return users as User[];
};
