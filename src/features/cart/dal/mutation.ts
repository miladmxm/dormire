import type {
  AddToCartPayload,
  UpdateCartItemPayload,
} from "@/services/cart/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as cartService from "@/services/cart/cart.service";

export const addToCart = async (input: Omit<AddToCartPayload, "userId">) =>
  dalRequireAuth(
    ({ id }) =>
      dalDbOperation(() => cartService.addToCart({ ...input, userId: id })),
    { cart: ["public-add"] },
  );

export const updateCartItem = async (
  input: Omit<UpdateCartItemPayload, "userId">,
) =>
  dalRequireAuth(
    async ({ id }) =>
      dalDbOperation(() =>
        cartService.updateCartItem({ ...input, userId: id }),
      ),
    { cart: ["public-add"] },
  );

export const removeFromCart = async (itemId: string) =>
  dalRequireAuth(
    async ({ id }) =>
      dalDbOperation(() => cartService.removeFromCart({ userId: id, itemId })),
    { cart: ["public-delete"] },
  );
