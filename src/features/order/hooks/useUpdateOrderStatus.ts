import { useState, useTransition } from "react";
import { toast } from "sonner";

import type { OrderStatus } from "@/services/shipping/type";

import { updateOrderStatusAction } from "../actions/update";

export const useUpdateOrderStatus = (id: string, defaultValue: OrderStatus) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(defaultValue);

  const updateStatus = (status: OrderStatus) => {
    if (isPending || status === value) return;

    startTransition(async () => {
      const result = await updateOrderStatusAction(id, status);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setValue(status);
      toast.success(result.message);
    });
  };

  return { isPending, updateStatus, value };
};
