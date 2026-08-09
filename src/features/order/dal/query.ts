import "server-only";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as orderService from "@/services/shipping/order.service";

export const getAdminOrders = async () =>
  dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => orderService.getAdminOrders()),
      { order: ["read"] },
    ),
  );

export const getAdminOrder = async (id: string) =>
  dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => orderService.getAdminOrder(id)),
      { order: ["read"] },
    ),
  );
