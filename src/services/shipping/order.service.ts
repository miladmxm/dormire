import { cacheTag } from "next/cache";
import "server-only";

import { CacheKeys } from "@/constant/cacheKeys";
import { ThrowableDalError } from "@/dal/types";
import { withTransaction } from "@/repositories";
import * as cartRepo from "@/repositories/cart.repo";
import * as orderRepo from "@/repositories/order.repo";

import type { CartItem } from "../cart/type";
import type { CreateOrder, FullOrder, Order } from "./type";

import { getCart } from "../cart/cart.service";
import { discountCalculation } from "../product/utils";

const checkCartItemsStock = async (
  cartItems: CartItem[] | FullOrder["items"],
) => {
  const outOfStockItems = cartItems.filter((item) => {
    const { stock } = item.metadata;
    if (stock === -1) return false;
    return item.quantity > stock;
  });

  if (outOfStockItems.length > 0) {
    const outOfStockProductNames = outOfStockItems.map(
      (item) => item.product.name,
    );
    throw new ThrowableDalError({
      message: `محصولات زیر موجودی کافی ندارند: ${outOfStockProductNames.join(", ")}`,
      type: "not-found",
    });
  }
};

export const createOrder = async (data: CreateOrder) => {
  const { addressId, sendingMethod, userId } = data;
  const userCart = await getCart(userId);

  if (!userCart || userCart.items.length === 0) {
    throw new ThrowableDalError({
      message: "سبد خرید شما خالی است",
      type: "not-found",
    });
  }

  await checkCartItemsStock(userCart.items);

  const orderItems = userCart.items.map((item) => {
    const unitPrice = item.metadata.price;
    const { discount } = item.metadata;
    const { quantity } = item;
    const itemTotal =
      discountCalculation({ price: unitPrice, discount }) * quantity;

    return {
      productId: item.productId,
      metadataId: item.metadataId,
      quantity,
      unitPrice,
      discount,
      itemTotal,
    };
  });

  const totalPrice = orderItems.reduce((sum, item) => sum + item.itemTotal, 0);

  const orderItemsData = orderItems.map(({ itemTotal: _, ...rest }) => rest);

  const orderId = await withTransaction(async (tx) => {
    const [createdOrder] = await orderRepo.createOrder(
      {
        userId,
        addressId,
        totalPrice,
        sendingMethod,
        paymentGateway: data.paymentGateway,
      },
      tx,
    );

    await orderRepo.createOrderItems(
      orderItemsData.map((item) => ({
        ...item,
        orderId: createdOrder.id,
      })),
      tx,
    );

    await cartRepo.deleteAllCartItems({ cartId: userCart.id, userId }, tx);

    return createdOrder.id;
  });

  return orderId;
};

export const updateOrderForPayAgainOrder = async (
  orderId: string,
  data: Partial<CreateOrder> & { userId: string },
) => {
  const { addressId, sendingMethod, userId } = data;
  const order = await orderRepo.findUserOrderById({
    id: orderId,
    userId,
  });
  if (!order)
    throw new ThrowableDalError({
      type: "not-found",
      message: "سفارش شما یافت نشد",
    });

  await checkCartItemsStock(order.items);
  const orderItems = order.items.map((item) => {
    const unitPrice = item.metadata.price;
    const { discount } = item.metadata;
    const { quantity } = item;
    const itemTotal =
      discountCalculation({ price: unitPrice, discount }) * quantity;
    return {
      productId: item.productId,
      metadataId: item.metadataId,
      quantity,
      unitPrice,
      discount,
      itemTotal,
    };
  });
  const totalPrice = orderItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const updatedOrderId = await withTransaction(async (tx) => {
    const [updatedOrder] = await orderRepo.updateOrderByIdAndUserId(
      {
        userId,
        orderId,
        data: {
          addressId,
          totalPrice,
          sendingMethod,
          paymentGateway: data.paymentGateway,
        },
      },
      tx,
    );

    return updatedOrder.id;
  });
  return updatedOrderId;
};

export const getUserOrder = async ({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) => {
  const order = await orderRepo.findUserOrderById({ id: orderId, userId });

  return order;
};

export const getPendingUserOrder = async ({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) => {
  const order: Order | undefined = await orderRepo.findPendingUserOrderById({
    id: orderId,
    userId,
  });
  return order;
};

export const getOrderForVerify = async (orderId: string) =>
  orderRepo.findPayingOrderById(orderId);

export const getUserOrders = async (userId: string) => {
  "use cache";

  cacheTag(`${CacheKeys.order}-${userId}`);

  return orderRepo.findOrdersByUserId(userId);
};

export const getAdminOrders = async () => {
  "use cache";

  cacheTag(CacheKeys.order);

  return orderRepo.findAllOrdersForAdmin();
};

export const getAdminOrder = async (id: string) => {
  "use cache";

  cacheTag(CacheKeys.order, `${CacheKeys.order}-${id}`);

  return orderRepo.findOrderForAdminById(id);
};

export const updateOrderStatus = (id: string, status: Order["status"]) =>
  orderRepo.updateOrderStatus({ id, status });
