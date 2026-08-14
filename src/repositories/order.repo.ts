import { and, desc, eq, or } from "drizzle-orm";

import type { OrderStatus } from "@/services/shipping/type";

import { order, orderItem } from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const createOrder = (
  data: typeof order.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(order).values(data).returning({ id: order.id });

export const createOrderItems = (
  data: (typeof orderItem.$inferInsert)[],
  tx?: Transaction,
) =>
  getDBorTX(tx).insert(orderItem).values(data).returning({ id: orderItem.id });

export const findPayingOrderById = (orderId: string, tx?: Transaction) =>
  getDBorTX(tx).query.order.findFirst({
    where: and(eq(order.id, orderId), eq(order.status, "paying")),
  });

export const findUserOrderById = (
  { id, userId }: { id: string; userId: string },
  tx?: Transaction,
) =>
  getDBorTX(tx).query.order.findFirst({
    where: and(eq(order.id, id), eq(order.userId, userId)),
    with: {
      address: true,
      items: {
        with: {
          product: {
            columns: { id: true, name: true, slug: true },
            with: { thumbnail: true },
          },
          metadata: true,
        },
      },
    },
  });

export const findPendingUserOrderById = (
  { id, userId }: { id: string; userId: string },
  tx?: Transaction,
) =>
  getDBorTX(tx).query.order.findFirst({
    where: and(
      eq(order.id, id),
      eq(order.userId, userId),
      or(eq(order.status, "pending"), eq(order.status, "paying")),
    ),
  });
export const findOrdersByUserId = (userId: string, tx?: Transaction) =>
  getDBorTX(tx).query.order.findMany({
    where: eq(order.userId, userId),
    orderBy: desc(order.createdAt),
    with: {
      items: {
        with: {
          product: {
            columns: { id: true, name: true, slug: true },
            with: { thumbnail: true },
          },
        },
      },
    },
  });

export const findAllOrdersForAdmin = (tx?: Transaction) =>
  getDBorTX(tx).query.order.findMany({
    orderBy: desc(order.createdAt),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
        },
      },
      address: {
        columns: {
          fullname: true,
          phoneNumber: true,
          province: true,
          city: true,
        },
      },
      items: {
        columns: {
          id: true,
          quantity: true,
        },
        with: {
          product: {
            columns: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });

export const findOrderForAdminById = (id: string, tx?: Transaction) =>
  getDBorTX(tx).query.order.findFirst({
    where: eq(order.id, id),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
        },
      },
      address: true,
      items: {
        with: {
          product: {
            columns: {
              id: true,
              name: true,
              slug: true,
            },
          },
          metadata: {
            columns: {
              id: true,
              price: true,
              stock: true,
              discount: true,
              optionItemIds: true,
            },
          },
        },
      },
      payments: {
        limit: 1,
        orderBy: (payments, operators) => [operators.desc(payments.createdAt)],
      },
    },
  });

export const updateOrderStatus = (
  { id, status }: { id: string; status: OrderStatus },
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(order)
    .set({ status })
    .where(eq(order.id, id))
    .returning({ id: order.id, userId: order.userId });

// export const updateOrderPaymentRef = (
//   { id, paymentRef }: { id: string; paymentRef: string },
//   tx?: Transaction,
// ) =>
//   getDBorTX(tx)
//     .update(order)
//     .set({ paymentRef })
//     .where(eq(order.id, id))
//     .returning({ id: order.id });
