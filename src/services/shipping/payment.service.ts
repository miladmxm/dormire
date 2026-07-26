import { SepPayment, ZarinpalPayment } from "persian-gateways";

import env from "@/config/env";
import * as orderRepo from "@/repositories/order.repo";

import type { PaymentGateway } from "./type";

const GATEWAY_BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const CALLBACK_URL = `${GATEWAY_BASE_URL}/api/payment/callback`;

const createPaymentInstance = (
  gateway: PaymentGateway,
  amount: number,
  orderId: string,
) => {
  const config = { amount, callBackUrl: CALLBACK_URL, tracker: orderId };

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

export const createPaymentFromOrder = async (orderId: string) => {
  const order = await orderRepo.findOrderById(orderId);

  if (!order) {
    return { success: false as const, message: "سفارش یافت نشد" };
  }

  if (order.status !== "pending") {
    return {
      success: false as const,
      message: "این سفارش قبلاً پردازش شده است",
    };
  }

  const gateway = order.paymentGateway as PaymentGateway;
  const payment = createPaymentInstance(gateway, order.totalPrice, orderId);

  const [error, result] = await payment.getPayPage();

  if (error || !result) {
    return {
      success: false as const,
      message: error?.message ?? "خطا در ایجاد درگاه پرداخت",
    };
  }

  return { success: true as const, url: result.url };
};

export const verifyPayment = async (params: {
  gateway: PaymentGateway;
  amount: number;
  url: string;
  body?: Record<string, unknown>;
}) => {
  const { gateway, amount, url, body } = params;
  const payment = createPaymentInstance(gateway, amount, "temp");

  const [error, result] = await payment.verify({ url, body });

  if (error || !result) {
    return {
      success: false as const,
      message: error?.message ?? "خطا در تأیید پرداخت",
    };
  }

  return { success: true as const, isOk: result.isOk };
};
