import { and, eq, isNotNull } from "drizzle-orm";

import { account, user } from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const findUserByPhoneNumber = (phoneNumber: string, tx?: Transaction) =>
  getDBorTX(tx).query.user.findFirst({
    columns: { id: true },
    where: eq(user.phoneNumber, phoneNumber),
  });

export const findCredentialAccountByUserId = (
  userId: string,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.account.findFirst({
    where: and(
      eq(account.userId, userId),
      eq(account.providerId, "credential"),
      isNotNull(account.password),
    ),
  });
