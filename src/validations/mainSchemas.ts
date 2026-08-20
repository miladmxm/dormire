import * as v from "valibot";

import { toLatinNumber } from "@/utils/toLatinNumber";

export const ThumbnailSchema = v.optional(
  v.union([
    v.pipe(
      v.object({
        id: v.pipe(v.string(), v.nonEmpty("یک تصویر شاخص انتخاب کنید")),
        url: v.pipe(v.string(), v.nonEmpty()),
      }),
      v.transform(({ id }) => id),
    ),
    v.nullable(v.string()),
  ]),
);
export const ThumbnailNotNullSchema = v.union(
  [
    v.pipe(
      v.object(
        {
          id: v.pipe(v.string(), v.nonEmpty("یک تصویر شاخص انتخاب کنید")),
          url: v.pipe(v.string(), v.nonEmpty("یک تصویر شاخص انتخاب کنید")),
        },
        "حتمای یک مورد را انتخاب کنید",
      ),
      v.transform(({ id }) => id),
    ),
    v.string("انتخاب تصویر الزامی است"),
  ],
  "انتخاب یک تصویر اجباری است",
);
export const PhoneNumberSchema = v.pipe(
  v.string(),
  v.nonEmpty("نمی‌تواند خالی باشه"),
  v.transform((input) => toLatinNumber(input).replaceAll(/\s/g, "")),
  v.regex(/^\d{9}$/, "شماره موبایل باید ۹ رقم بعد از ۰۹ باشد"),
  v.transform((input) => {
    return `+989${input}`;
  }),
);
