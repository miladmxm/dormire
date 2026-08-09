import { cacheTag } from "next/cache";
import "server-only";

import { CacheKeys } from "@/constant/cacheKeys";
import { withTransaction } from "@/repositories";
import * as cartRepo from "@/repositories/cart.repo";
import * as orderRepo from "@/repositories/order.repo";

import type { CreateOrder, Order } from "./type";

import { discountCalculation } from "../product/utils";

export const createOrder = async (data: CreateOrder) => {
  const { addressId, sendingMethod, userId } = data;

  const userCart =
    await cartRepo.findCartByUserIdWithProductAndMetadata(userId);

  if (!userCart || userCart.items.length === 0) {
    throw new Error("سبد خرید شما خالی است");
  }

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
