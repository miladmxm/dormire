import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as addressService from "@/services/shipping/address.service";
import * as orderService from "@/services/shipping/order.service";
import * as paymentService from "@/services/shipping/payment.service";

import "server-only";

export const getUserAddress = async () =>
  dalVerifySuccess(
    await dalRequireAuth(
      ({ id }) => dalDbOperation(() => addressService.getUserAddresses(id)),
      {
        address: ["read"],
      },
    ),
  );

export const getUserOrders = async () =>
  dalVerifySuccess(
    await dalRequireAuth(
      ({ id }) => dalDbOperation(() => orderService.getUserOrders(id)),
      {
        order: ["read"],
      },
    ),
  );

export const getUserOrder = async (orderId: string) =>
  dalVerifySuccess(
    await dalRequireAuth(
      ({ id }) =>
        dalDbOperation(() =>
          orderService.getUserOrder({ orderId, userId: id }),
        ),
      { order: ["read"] },
    ),
  );
export const getPendingUserOrder = async (orderId: string) =>
  dalVerifySuccess(
    await dalRequireAuth(
      ({ id }) =>
        dalDbOperation(() =>
          orderService.getPendingUserOrder({ orderId, userId: id }),
        ),
      { order: ["read"] },
    ),
  );
export const getOrderSuccessPayment = async (orderId: string) =>
  dalVerifySuccess(
    await dalDbOperation(() => paymentService.getSuccessOrderPayment(orderId)),
  );
