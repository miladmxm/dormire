import { redirect } from "next/navigation";
import "server-only";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as customerAuthService from "@/services/auth/customer.service";
import * as cartService from "@/services/cart/cart.service";
import * as addressService from "@/services/shipping/address.service";
import * as orderService from "@/services/shipping/order.service";

import type { CustomerProfileData } from "../types";

export const getCustomerProfile = async (): Promise<CustomerProfileData> => {
  const result = await dalRequireAuth(
    (user) =>
      dalDbOperation(async () => {
        const [addresses, orders, cart] = await Promise.all([
          addressService.getUserAddresses(user.id),
          orderService.getUserOrders(user.id),
          cartService.getCart(user.id),
        ]);

        return {
          user: {
            ...user,
            phoneNumberVerified: Boolean(user.phoneNumberVerified),
            phoneNumber: user.phoneNumber ?? null,
            image: user.image ?? null,
            createdAt: user.createdAt.toISOString(),
          },
          addresses: addresses.map(({ userId: _, ...address }) => ({
            ...address,
            createdAt: address.createdAt.toISOString(),
          })),
          orders: orders.map((order) => ({
            id: order.id,
            status: order.status,
            totalPrice: order.totalPrice,
            createdAt: order.createdAt.toISOString(),
            items: order.items.map((item) => ({
              id: item.id,
              quantity: item.quantity,
              product: {
                name: item.product.name,
                slug: item.product.slug,
              },
            })),
          })),
          cartItemCount:
            cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
        } satisfies CustomerProfileData;
      }),
    {
      address: ["read"],
      cart: ["read"],
      order: ["read"],
    },
  );

  if (
    !result.success &&
    (result.error.type === "no-user" || result.error.type === "no-access")
  ) {
    redirect("/");
  }

  return dalVerifySuccess(result, { unauthorizedRedirectPath: "/" });
};

export const checkUserHavePassword = async () => {
  const status = dalVerifySuccess(
    await dalRequireAuth(
      ({ id }) => dalDbOperation(() => customerAuthService.userHasPassword(id)),
      { profile: ["read"] },
    ),
  );
  return status;
};
