import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { ThrowableDalError } from "@/dal/types";
import * as addressRepo from "@/repositories/address.repo";
import "server-only";

import type { Address, CreateAddress } from "./type";

// * READ
export const getUserAddresses = async (userId: string) => {
  "use cache";

  cacheTag(`${CacheKeys.address}-${userId}`);
  return addressRepo.findAddressByUserId(userId);
};

// * CREATE
export const createAddress = async (address: CreateAddress) => {
  const [{ id }] = await addressRepo.createAddress(address);
  return id;
};

// * UPDATE
export const updateAddress = async ({
  id,
  userId,
  ...data
}: Omit<Address, "createdAt"> & { userId: string }) => {
  const [updatedAddress] = await addressRepo.updateAddress({
    id,
    userId,
    data,
  });

  if (!updatedAddress) {
    throw new ThrowableDalError({ type: "not-found" });
  }

  return updatedAddress.id;
};

// * DELETE
export const deleteAddress = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const relatedOrder = await addressRepo.findOrderByAddress({ id, userId });

  if (relatedOrder) {
    throw new ThrowableDalError({
      type: "validation",
      message:
        "آدرس استفاده‌شده در سفارش قابل حذف نیست؛ می‌توانید آن را ویرایش کنید.",
    });
  }

  const [deletedAddress] = await addressRepo.deleteAddress({ id, userId });

  if (!deletedAddress) {
    throw new ThrowableDalError({ type: "not-found" });
  }

  return deletedAddress.id;
};
