import { payment } from "@/db/drizzle/schemas/payment";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const createPayment = (
  data: typeof payment.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(payment).values(data).returning({ id: payment.id });
