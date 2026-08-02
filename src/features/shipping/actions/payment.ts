"use server";

import type { ActionResult } from "@/types/actions";

import { getSession } from "@/lib/auth";
import { createPaymentFromOrder } from "@/services/shipping/payment.service";

import { getUserOrder } from "../dal/query";

export const initiatePaymentAction = async (
  orderId: string,
): Promise<ActionResult<Record<string, never>, { url: string }>> => {
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, message: "لطفا ابتدا وارد حساب خود شوید" };
  }

  const order = await getUserOrder(orderId);

  if (!order) {
    return { success: false, message: "سفارش یافت نشد" };
  }

  const result = await createPaymentFromOrder({
    orderId,
    userId: session.user.id,
  });

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return {
    success: true,
    message: "در حال انتقال به درگاه پرداخت",
    data: { url: result.url },
  };
};
