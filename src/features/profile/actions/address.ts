"use server";

import { revalidatePath, updateTag } from "next/cache";
import * as v from "valibot";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import * as shippingMutation from "@/features/shipping/dal/mutation";
import { getSession } from "@/lib/auth";
import { validator } from "@/validations";

import type {
  NewProfileAddressInput,
  ProfileAddressInput,
} from "../validations/address";

import {
  NewProfileAddressSchema,
  ProfileAddressSchema,
} from "../validations/address";

const DeleteAddressSchema = v.object({
  id: v.pipe(v.string(), v.uuid("شناسه آدرس نامعتبر است")),
});

const refreshAddressData = (userId: string) => {
  updateTag(`${CacheKeys.address}-${userId}`);
  revalidatePath("/profile");
};

export const createProfileAddressAction = async (
  input: unknown,
): Promise<ActionResult<NewProfileAddressInput, string>> => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "برای ثبت آدرس وارد حساب شوید" };
  }

  const validation = validator(NewProfileAddressSchema, input);

  if (!validation.success) {
    return {
      success: false,
      message: "اطلاعات آدرس را بررسی کنید",
      errors: validation.errors,
    };
  }

  const result = await shippingMutation.createAddress(validation.output);

  if (!result.success) {
    return { success: false, message: "ثبت آدرس انجام نشد" };
  }

  refreshAddressData(session.user.id);
  return {
    success: true,
    data: result.data,
    message: "آدرس جدید ثبت شد",
  };
};

export const updateProfileAddressAction = async (
  input: unknown,
): Promise<ActionResult<ProfileAddressInput, string>> => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "برای ویرایش آدرس وارد حساب شوید" };
  }

  const validation = validator(ProfileAddressSchema, input);

  if (!validation.success) {
    return {
      success: false,
      message: "اطلاعات آدرس را بررسی کنید",
      errors: validation.errors,
    };
  }

  const result = await shippingMutation.updateAddress(validation.output);

  if (!result.success) {
    return { success: false, message: "ویرایش آدرس انجام نشد" };
  }

  refreshAddressData(session.user.id);
  return {
    success: true,
    data: result.data,
    message: "آدرس با موفقیت ویرایش شد",
  };
};

export const deleteProfileAddressAction = async (
  input: unknown,
): Promise<ActionResult<{ id: string }, string>> => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "برای حذف آدرس وارد حساب شوید" };
  }

  const validation = validator(DeleteAddressSchema, input);

  if (!validation.success) {
    return {
      success: false,
      message: "شناسه آدرس نامعتبر است",
      errors: validation.errors,
    };
  }

  const result = await shippingMutation.deleteAddress(validation.output.id);

  if (!result.success) {
    const message =
      result.error.type === "validation"
        ? result.error.message
        : "حذف آدرس انجام نشد";
    return { success: false, message };
  }

  refreshAddressData(session.user.id);
  return {
    success: true,
    data: result.data,
    message: "آدرس حذف شد",
  };
};
