import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as addressService from "@/services/shipping/address.service";
import * as orderService from "@/services/shipping/order.service";
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
