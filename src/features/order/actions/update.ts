"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { validator } from "@/validations";

import type { UpdateOrderStatusOutput } from "../validations";

import { updateOrderStatus as updateOrderStatusDAL } from "../dal/mutation";
import { UpdateOrderStatusSchema } from "../validations";

export const updateOrderStatusAction = async (
  id: string,
  status: unknown,
): Promise<ActionResult<UpdateOrderStatusOutput>> => {
  const { errors, output, success } = validator(UpdateOrderStatusSchema, {
    id,
    status,
  });

  if (!success) {
    return {
      success: false,
      message: "وضعیت انتخاب‌شده معتبر نیست",
      errors,
    };
  }

  try {
    const result = await updateOrderStatusDAL(output.id, output.status);

    if (!result.success || !result.data[0]) {
      return { success: false, message: "تغییر وضعیت سفارش انجام نشد" };
    }

    updateTag(CacheKeys.order);
    updateTag(`${CacheKeys.order}-${output.id}`);
    updateTag(`${CacheKeys.order}-${result.data[0].userId}`);

    return { success: true, message: "وضعیت سفارش به‌روزرسانی شد" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "خطا در تغییر وضعیت سفارش" };
  }
};
