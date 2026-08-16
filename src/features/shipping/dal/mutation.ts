import type {
  Address,
  CreateAddress,
  CreateOrder,
} from "@/services/shipping/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as addressService from "@/services/shipping/address.service";
import * as orderService from "@/services/shipping/order.service";
import "server-only";

export const createAddress = (data: Omit<CreateAddress, "userId">) =>
  dalRequireAuth(
    ({ id }) =>
      dalDbOperation(() =>
        addressService.createAddress({ ...data, userId: id }),
      ),
    { address: ["public-create"] },
  );

export const updateAddress = (data: Omit<Address, "createdAt">) =>
  dalRequireAuth(
    ({ id }) =>
      dalDbOperation(() =>
        addressService.updateAddress({ ...data, userId: id }),
      ),
    { address: ["public-update"] },
  );

export const deleteAddress = (id: string) =>
  dalRequireAuth(
    ({ id: userId }) =>
      dalDbOperation(() => addressService.deleteAddress({ id, userId })),
    { address: ["public-delete"] },
  );

export const createOrder = (data: Omit<CreateOrder, "userId">) =>
  dalRequireAuth(
    ({ id }) =>
      dalDbOperation(() => orderService.createOrder({ ...data, userId: id })),
    { order: ["public-create"] },
  );

export const payAgaingOrder = (
  orderId: string,
  data: Partial<Omit<CreateOrder, "userId">>,
) =>
  dalRequireAuth(
    ({ id }) =>
      dalDbOperation(() =>
        orderService.updateOrderForPayAgainOrder(orderId, {
          ...data,
          userId: id,
        }),
      ),
    { order: ["public-create"] },
  );
