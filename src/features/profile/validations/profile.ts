import * as v from "valibot";

export const UpdateFullnameSchema = v.object({
  fullname: v.pipe(v.string(), v.nonEmpty("نمیتواند خالی باشد")),
});

export const UpdateEmailSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("نمیتواند خالی باشد"),
    v.email("فرمت ایمیل صحیح نیست"),
  ),
});
