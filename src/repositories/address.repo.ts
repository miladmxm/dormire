import { and, desc, eq } from "drizzle-orm";

import { address, order } from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const findAddressByUserId = (userId: string, tx?: Transaction) =>
  getDBorTX(tx).query.address.findMany({
    where: eq(address.userId, userId),
    orderBy: desc(address.createdAt),
  });

export const createAddress = (
  data: typeof address.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(address).values(data).returning({ id: address.id });

export const updateAddress = (
  {
    id,
    userId,
    data,
  }: {
    id: string;
    userId: string;
    data: Omit<typeof address.$inferInsert, "createdAt" | "id" | "userId">;
  },
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(address)
    .set(data)
    .where(and(eq(address.id, id), eq(address.userId, userId)))
    .returning({ id: address.id });

export const findOrderByAddress = (
  { id, userId }: { id: string; userId: string },
  tx?: Transaction,
) =>
  getDBorTX(tx).query.order.findFirst({
    columns: { id: true },
    where: and(eq(order.addressId, id), eq(order.userId, userId)),
  });

export const deleteAddress = (
  { id, userId }: { id: string; userId: string },
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .delete(address)
    .where(and(eq(address.id, id), eq(address.userId, userId)))
    .returning({ id: address.id });
