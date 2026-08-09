import "server-only";

import type { OrderStatus } from "@/services/shipping/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as orderService from "@/services/shipping/order.service";

export const updateOrderStatus = (id: string, status: OrderStatus) =>
  dalRequireAuth(
    () => dalDbOperation(() => orderService.updateOrderStatus(id, status)),
    { order: ["update"] },
  );
