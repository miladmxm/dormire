import { SepPayment, ZarinpalPayment } from "persian-gateways";

import env from "@/config/env";
import { withTransaction } from "@/repositories";
import * as orderRepo from "@/repositories/order.repo";
import * as paymentRepo from "@/repositories/payment.repo";

import type { PaymentGateway } from "./type";

import { getOrderForVerify } from "./order.service";

const GATEWAY_BASE_URL = env.ORIGIN;

const CALLBACK_URL = `${GATEWAY_BASE_URL}/api/payment/callback`;

const createPaymentInstance = (
  gateway: PaymentGateway,
  amount: number,
  orderId: string,
) => {
  const callback = new URL(CALLBACK_URL);
  callback.searchParams.append("orderId", orderId);
  callback.searchParams.append("gateway", gateway);
  const config = { amount, callBackUrl: callback.href, tracker: orderId };

  switch (gateway) {
    case "zarinpal":
      return new ZarinpalPayment({
        ...config,
        gatewayId: env.ZARINPAL_GATEWAY_ID,
        sandbox: process.env.NODE_ENV !== "production",
      });

    case "saman":
      return new SepPayment({
        ...config,
        gatewayId: env.SAMAN_GATEWAY_ID,
      });

    default:
      throw new Error(`Gateway "${gateway}" is not supported`);
  }
};

export const createPaymentFromOrder = async ({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) => {
  const order = await orderRepo.findPendingUserOrderById({
    id: orderId,
    userId,
  });

  if (!order) {
    return { success: false as const, message: "سفارش یافت نشد" };
  }

  const gateway = order.paymentGateway;

  if (!gateway) {
    return { success: false as const, message: "درگاه پرداخت انتخاب نشده است" };
  }

  const payment = createPaymentInstance(gateway, order.totalPrice, orderId);

  const [error, result] = await payment.getPayPage();

  if (error || !result) {
    return {
      success: false as const,
      message: error?.message ?? "خطا در ایجاد درگاه پرداخت",
    };
  }

  await orderRepo.updateOrderStatus({ status: "paying", id: orderId });
  return { success: true as const, url: result.url };
};

const createVerifiedPayment = (data: {
  userId: string;
  orderId: string;
  amount: number;
  gateway: PaymentGateway;
  transaction?: unknown;
}) => {
  return withTransaction(async (tx) => {
    const [{ id }] = await paymentRepo.createPayment(data, tx);
    await orderRepo.updateOrderStatus({ id: data.orderId, status: "paid" }, tx);
    return id;
  });
};

export const verifyPayment = async (params: {
  gateway: PaymentGateway;
  url: string;
  orderId: string;
  body?: Record<string, unknown>;
}) => {
  const { gateway, url, body, orderId } = params;
  const order = await getOrderForVerify(orderId);

  if (!order) {
    return { success: false as const, message: "این سفارش وجود ندارد" };
  }
  if (!order || order.paymentGateway !== gateway) {
    return { success: false as const, message: "نام درگاه صحیح نیست" };
  }

  const payment = createPaymentInstance(gateway, order.totalPrice, orderId);
  const [error, result] = await payment.verify({ url, body });

  if (error || !result) {
    await orderRepo.updateOrderStatus({ id: orderId, status: "pending" });
    return {
      success: false as const,
      message: error?.message ?? "خطا در تأیید پرداخت",
    };
  }

  await createVerifiedPayment({
    amount: order.totalPrice,
    gateway,
    orderId,
    userId: order.userId,
    transaction: { body, url },
  });
  return { success: true as const, isOk: result.isOk };
};

export const getSuccessOrderPayment = async (orderId: string) =>
  paymentRepo.findPaymentByOrderId(orderId);
