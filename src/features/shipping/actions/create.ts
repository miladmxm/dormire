"use server";

import { updateTag } from "next/cache";

import type {
  CreateAddress,
  CreateOrder,
  PaymentGateway,
  SendingMethod,
} from "@/services/shipping/type";
import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { getSession } from "@/lib/auth";
import { validator } from "@/validations";

import * as dalShippingMutation from "../dal/mutation";
import { AddAddressSchema, CreateOrderSchema } from "../validations";

export const createAddressAction = async (
  inputData: unknown,
): Promise<ActionResult<Partial<CreateAddress>, string>> => {
  const {
    errors,
    output,
    success: successValidation,
  } = validator(AddAddressSchema, inputData);
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, message: "لطفا ابتدا وارد حساب خود شوید" };
  }
  if (!successValidation) {
    return { success: successValidation, message: "خطای اعتبارسنجی", errors };
  }

  try {
    const createdAddressOutput =
      await dalShippingMutation.createAddress(output);

    if (!createdAddressOutput.success) {
      return { success: false, message: "خطا در ایجاد آدرس" };
    }

    updateTag(`${CacheKeys.address}-${session.user.id}`);
    return {
      success: successValidation,
      message: "آدرس جدید با موفقیت ثبت شد",
      data: createdAddressOutput.data,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد آدرس" };
  }
};

export const createOrderAction = async (
  inputData: unknown,
): Promise<ActionResult<Record<string, never>, string>> => {
  const {
    errors,
    output,
    success: successValidation,
  } = validator(CreateOrderSchema, inputData);
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, message: "لطفا ابتدا وارد حساب خود شوید" };
  }
  if (!successValidation) {
    return { success: successValidation, message: "خطای اعتبارسنجی", errors };
  }

  try {
    const orderData: Omit<CreateOrder, "userId"> = {
      addressId: output.addressId,
      sendingMethod: output.sendingMethod as SendingMethod,
      paymentGateway: output.paymentGateway as PaymentGateway,
    };

    const createdOrderOutput = await dalShippingMutation.createOrder(orderData);

    if (!createdOrderOutput.success) {
      return {
        success: false,
        message: createdOrderOutput.error.message || "خطا در ایجاد سفارش",
      };
    }

    updateTag(`${CacheKeys.cart}-${session.user.id}`);
    updateTag(`${CacheKeys.order}-${session.user.id}`);
    return {
      success: true,
      message: "سفارش شما با موفقیت ثبت شد",
      data: createdOrderOutput.data,
    };
  } catch (error) {
    console.log(error);
    const message =
      error instanceof Error ? error.message : "خطا در ایجاد سفارش";
    return { success: false, message };
  }
};

export const createPayFromOrderAction = async (
  orderId: string,
  inputData: unknown,
): Promise<ActionResult<Record<string, never>, string>> => {
  // todo update and check order for pay

  return { success: false, message: "نشد دیگه" };
};
