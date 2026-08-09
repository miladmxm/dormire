import * as v from "valibot";

import type { OrderStatus } from "@/services/shipping/type";

import { orderStatuses } from "@/services/shipping/type";

export const OrderIdSchema = v.pipe(v.string(), v.uuid());

export const UpdateOrderStatusSchema = v.object({
  id: OrderIdSchema,
  status: v.picklist<OrderStatus[]>([...orderStatuses]),
});

export type UpdateOrderStatusOutput = v.InferOutput<
  typeof UpdateOrderStatusSchema
>;
