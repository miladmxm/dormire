import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as cartService from "@/services/cart/cart.service";

export const getUserCart = async () =>
  dalVerifySuccess(
    await dalRequireAuth(
      ({ id }) => dalDbOperation(() => cartService.getCart(id)),
      {
        cart: ["public-read"],
      },
    ),
  );
