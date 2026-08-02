import { eq } from "drizzle-orm";

import { payment } from "@/db/drizzle/schemas/payment";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const createPayment = (
  data: typeof payment.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(payment).values(data).returning({ id: payment.id });

export const findPaymentByOrderId = (orderId: string, tx?: Transaction) =>
  getDBorTX(tx).query.payment.findFirst({
    where: eq(payment.orderId, orderId),
  });
