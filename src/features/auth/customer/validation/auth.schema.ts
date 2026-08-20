import * as v from "valibot";

import { toLatinNumber } from "@/utils/toLatinNumber";
import { PhoneNumberSchema } from "@/validations/mainSchemas";

export const PhoneNumberSchemaObject = v.object({
  phoneNumber: PhoneNumberSchema,
});

export const PasswordSchemaObject = v.object({
  password: v.pipe(
    v.string(),
    v.nonEmpty("رمز عبور اجباری است"),
    v.minLength(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    v.maxLength(256, "رمز عبور حداکثر می‌تواند ۲۵۶ کاراکتر باشد"),
  ),
});

export const VerifyOTPschema = v.object({
  code: v.pipe(
    v.string(),
    v.nonEmpty("نمی‌تواند خالی باشد"),
    v.transform((input) => toLatinNumber(input)),
    v.regex(/\d/, "فقط عدد مجاز است"),
    v.minLength(6, "تعداد کد صحیح نیست"),
    v.maxLength(6, "تعداد کد صحیح نیست"),
  ),
});

export const NormalizedPhoneNumberSchema = v.object({
  phoneNumber: v.pipe(
    v.string(),
    v.regex(/^\+989\d{9}$/, "شماره موبایل معتبر نیست"),
  ),
});

export const CompleteRegistrationSchema = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty("نام و نام خانوادگی اجباری است"),
      v.minLength(2, "نام باید حداقل ۲ کاراکتر باشد"),
      v.maxLength(80, "نام حداکثر می‌تواند ۸۰ کاراکتر باشد"),
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty("رمز عبور اجباری است"),
      v.minLength(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
      v.maxLength(256, "رمز عبور حداکثر می‌تواند ۲۵۶ کاراکتر باشد"),
    ),
    confirmPassword: v.pipe(
      v.string(),
      v.nonEmpty("تکرار رمز عبور اجباری است"),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "رمز عبور و تکرار آن یکسان نیست",
    ),
    ["confirmPassword"],
  ),
);

export type CompleteRegistrationInput = v.InferOutput<
  typeof CompleteRegistrationSchema
>;
export type NormalizedPhoneNumberInput = v.InferOutput<
  typeof NormalizedPhoneNumberSchema
>;
