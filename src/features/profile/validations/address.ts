import * as v from "valibot";

import { toLatinNumber } from "@/utils/toLatinNumber";

export const ProfileAddressSchema = v.object({
  id: v.pipe(v.string(), v.uuid("شناسه آدرس نامعتبر است")),
  fullname: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, "نام تحویل‌گیرنده حداقل ۳ حرف باشد"),
    v.maxLength(80, "نام تحویل‌گیرنده بیش از حد طولانی است"),
  ),
  phoneNumber: v.pipe(
    v.string(),
    v.trim(),
    v.transform(toLatinNumber),
    v.regex(/^(?:\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست"),
  ),
  postCode: v.pipe(
    v.string(),
    v.trim(),
    v.transform(toLatinNumber),
    v.regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
  ),
  province: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "نام استان را وارد کنید"),
    v.maxLength(50, "نام استان بیش از حد طولانی است"),
  ),
  city: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "نام شهر را وارد کنید"),
    v.maxLength(50, "نام شهر بیش از حد طولانی است"),
  ),
  additionalAddress: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(8, "نشانی را کامل‌تر وارد کنید"),
    v.maxLength(300, "نشانی بیش از حد طولانی است"),
  ),
});

export const NewProfileAddressSchema = v.omit(ProfileAddressSchema, ["id"]);

export type ProfileAddressInput = v.InferOutput<typeof ProfileAddressSchema>;
export type NewProfileAddressInput = v.InferOutput<
  typeof NewProfileAddressSchema
>;
