import * as v from "valibot";

import { USER_ROLES } from "@/constant/appData";
import { PhoneNumberSchema } from "@/validations/mainSchemas";

export const CreateUserShema = v.object({
  name: v.pipe(v.string("نام الزامی است"), v.nonEmpty("نمیتواند خالی باشد")),
  email: v.pipe(v.string("ایمیل الزامی است"), v.email("فرمت ایمیل صحیح نیست")),
  password: v.pipe(
    v.string("رمز عبور الزامی است"),
    v.nonEmpty("نمیتواند خالی باشد"),
  ),
  phoneNumber: PhoneNumberSchema,
  role: v.optional(v.picklist(USER_ROLES), "customer"),
});

export type CreateUserOutput = v.InferOutput<typeof CreateUserShema>;

export const EditUserSchema = v.object({
  name: v.pipe(
    v.string("نام الزامی است"),
    v.trim(),
    v.nonEmpty("نام نمی‌تواند خالی باشد"),
    v.minLength(3, "نام باید حداقل ۳ کاراکتر باشد"),
  ),
  email: v.pipe(
    v.string("ایمیل الزامی است"),
    v.trim(),
    v.toLowerCase(),
    v.email("فرمت ایمیل صحیح نیست"),
  ),
  phoneNumber: v.union([v.literal(""), PhoneNumberSchema]),
  image: v.union([
    v.literal(""),
    v.pipe(v.string(), v.url("آدرس تصویر معتبر نیست")),
  ]),
});

export type EditUserInput = v.InferInput<typeof EditUserSchema>;
export type EditUserOutput = v.InferOutput<typeof EditUserSchema>;
