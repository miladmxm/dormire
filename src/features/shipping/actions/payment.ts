"use server";

import type { ActionResult } from "@/types/actions";

import { getSession } from "@/lib/auth";
import * as orderService from "@/services/shipping/order.service";
import { createPaymentFromOrder } from "@/services/shipping/payment.service";

export const initiatePaymentAction = async (
  orderId: string,
): Promise<ActionResult<Record<string, never>, { url: string }>> => {
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, message: "لطفا ابتدا وارد حساب خود شوید" };
  }

  const order = await orderService.getOrderById(orderId, session.user.id);

  if (!order) {
    return { success: false, message: "سفارش یافت نشد" };
  }

  const result = await createPaymentFromOrder(orderId);

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return {
    success: true,
    message: "در حال انتقال به درگاه پرداخت",
    data: { url: result.url },
  };
};
