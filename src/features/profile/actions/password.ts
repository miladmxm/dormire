"use server";

import { revalidatePath, updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { getSession } from "@/lib/auth";
import { validator } from "@/validations";

import type { NewPasswordSchemaOutput } from "../validations/profile";

import * as profileMutation from "../dal/mutation";
import { NewPasswordSchema } from "../validations/profile";

export const setUserPasswordAction = async (
  input: unknown,
): Promise<ActionResult<NewPasswordSchemaOutput, string>> => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "شما دسترسی انجام این عمل را ندارید" };
  }

  const validation = validator(NewPasswordSchema, input);

  if (!validation.success) {
    return {
      success: false,
      message: "مقادیر به درستی وارد نشده است",
      errors: validation.errors,
    };
  }

  const result = await profileMutation.setUserPasswordIfNotHave(
    validation.output.newPassword,
  );
  console.log(result);

  if (!result.success) {
    const message =
      result.error.type === "validation"
        ? result.error.message
        : "شما امکان تنظیم رمز عبور را ندارید";
    return { success: false, message };
  }

  updateTag(`${CacheKeys.userAcount}-${session.user.id}`);
  revalidatePath("/profile");
  return {
    success: true,
    message: "رمز عبور شما تنظیم شد",
  };
};
