import { useTransition } from "react";
import { toast } from "sonner";

import type { CreateOrder } from "@/services/shipping/type";

import { createOrderAction, createPayFromOrderAction } from "../actions/create";
import { initiatePaymentAction } from "../actions/payment";

export const useCreateOrder = () => {
  const [isPending, startTransition] = useTransition();

  const handleCreateOrder = (input: Partial<Omit<CreateOrder, "userId">>) => {
    startTransition(async () => {
      const orderResult = await createOrderAction(input);

      if (!orderResult.success) {
        toast.error("سفارش ایجاد نشد", { description: orderResult.message });
        return;
      }

      const orderId = orderResult.data;

      if (!orderId) {
        console.error("شناسه سفارش دریافت نشد");
        return;
      }

      const paymentResult = await initiatePaymentAction(orderId);

      if (!paymentResult.success || !paymentResult.data) {
        console.error(paymentResult.message);
        return;
      }

      window.location.href = paymentResult.data.url;
    });
  };

  return { isPending, handleCreateOrder };
};

export const usePayCreatedOrder = (orderId?: string) => {
  const [isPending, startTransition] = useTransition();

  const handlePayFromOrder = (input: Partial<Omit<CreateOrder, "userId">>) => {
    startTransition(async () => {
      if (!orderId) return;
      const payResult = await createPayFromOrderAction(orderId, input);

      if (!payResult.success) {
        toast.error("سفارش ایجاد نشد", { description: payResult.message });
        return;
      }

      const paymentResult = await initiatePaymentAction(orderId);

      if (!paymentResult.success || !paymentResult.data) {
        console.error(paymentResult.message);
        return;
      }

      window.location.href = paymentResult.data.url;
    });
  };

  return { isPending, handlePayFromOrder };
};
