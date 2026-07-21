import { useTransition } from "react";

import type { CreateOrder } from "@/services/shipping/type";

import { createOrderAction } from "../actions/create";

export const useCreateOrder = () => {
  const [isPending, startTransition] = useTransition();

  const handleCreateOrder = (input: Partial<Omit<CreateOrder, "userId">>) => {
    startTransition(async () => {
      const { success, message } = await createOrderAction(input);
      console.log(success, message);
    });
  };

  return { isPending, handleCreateOrder };
};
