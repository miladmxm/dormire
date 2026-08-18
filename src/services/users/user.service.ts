import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import "server-only";

export const getAllUsers = async () => {
  const users = await auth.api.listUsers({
    headers: await headers(),
    query: {},
  });
  console.log(users);
  return users;
};
