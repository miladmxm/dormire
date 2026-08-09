import { eq } from "drizzle-orm";

import { account } from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const findAcountByUserId = (userId: string, tx?: Transaction) =>
  getDBorTX(tx).query.account.findFirst({
    where: eq(account.userId, userId),
  });
