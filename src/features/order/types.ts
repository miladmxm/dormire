import type { getAdminOrder, getAdminOrders } from "./dal/query";

export type AdminOrderListItem = Awaited<
  ReturnType<typeof getAdminOrders>
>[number];

export type AdminOrderDetails = NonNullable<
  Awaited<ReturnType<typeof getAdminOrder>>
>;
