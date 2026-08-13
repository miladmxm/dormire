"use server";

import { APIError } from "better-auth";
import { updateTag } from "next/cache";
import { headers } from "next/headers";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { auth } from "@/lib/auth";
import * as customerAuthService from "@/services/auth/customer.service";
import { validator } from "@/validations";

import type {
  CompleteRegistrationInput,
  NormalizedPhoneNumberInput,
} from "../validation/auth.schema";

import {
  CompleteRegistrationSchema,
  NormalizedPhoneNumberSchema,
} from "../validation/auth.schema";

interface StartPhoneAuthData {
  intent: "registration" | "signIn";
  nextStep: "password" | "verify";
}

const getActionErrorMessage = (error: unknown) => {
  if (!(error instanceof APIError)) {
    return "در انجام عملیات مشکلی پیش آمد؛ دوباره تلاش کنید";
  }

  const code = (error.body as { code?: string } | undefined)?.code;

  if (code === "SESSION_EXPIRED") {
    return "نشست شما منقضی شده است؛ دوباره کد تأیید بگیرید";
  }

  if (code === "PASSWORD_ALREADY_SET") {
    return "برای این حساب قبلاً رمز عبور تنظیم شده است";
  }

  return error.message || "در تکمیل حساب مشکلی پیش آمد";
};

export const startPhoneAuth = async (
  input: unknown,
): Promise<ActionResult<NormalizedPhoneNumberInput, StartPhoneAuthData>> => {
  const validation = validator(NormalizedPhoneNumberSchema, input);

  if (!validation.success) {
    return {
      success: false,
      message: "شماره موبایل معتبر نیست",
      errors: validation.errors,
    };
  }

  try {
    const method = await customerAuthService.getPhoneAuthMethod(
      validation.output.phoneNumber,
    );

    if (method === "password") {
      return {
        success: true,
        data: { intent: "signIn", nextStep: "password" },
      };
    }

    await auth.api.sendPhoneNumberOTP({
      body: { phoneNumber: validation.output.phoneNumber },
    });

    return {
      success: true,
      data: { intent: "registration", nextStep: "verify" },
    };
  } catch (error) {
    return { success: false, message: getActionErrorMessage(error) };
  }
};

export const completeRegistration = async (
  input: unknown,
): Promise<ActionResult<CompleteRegistrationInput>> => {
  const validation = validator(CompleteRegistrationSchema, input);

  if (!validation.success) {
    return {
      success: false,
      message: "اطلاعات ثبت‌نام معتبر نیست",
      errors: validation.errors,
    };
  }

  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user.phoneNumberVerified) {
    return {
      success: false,
      message: "برای تکمیل ثبت‌نام ابتدا شماره موبایل را تأیید کنید",
    };
  }

  try {
    await auth.api.updateUser({
      body: { name: validation.output.name },
      headers: requestHeaders,
    });
    await auth.api.setPassword({
      body: { newPassword: validation.output.password },
      headers: requestHeaders,
    });

    updateTag(`${CacheKeys.userAccount}-${session.user.id}`);

    return { success: true, message: "ثبت‌نام شما با موفقیت تکمیل شد" };
  } catch (error) {
    return { success: false, message: getActionErrorMessage(error) };
  }
};
