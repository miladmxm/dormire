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

export const NewPasswordSchema = v.pipe(
  v.object({
    newPassword: v.pipe(
      v.string("این فیلد اجباری است"),
      v.nonEmpty("نمیتواند خالی باشد"),
      v.trim(),
      v.minLength(8, "حداقل باید ۸ کاراکتر باشد"),
      v.maxLength(256, "حداکثر میتواند ۲۵۶ کاراکتر باشد"),
    ),
    confirmNewPassword: v.pipe(
      v.string("این فیلد اجباری است"),
      v.nonEmpty("نمیتواند خالی باشد"),
      v.trim(),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["newPassword"], ["confirmNewPassword"]],
      (input) => input.newPassword === input.confirmNewPassword,
      "رمز عبور و تکرار آن یکسان نیست",
    ),
    ["confirmNewPassword"],
  ),
);

export type NewPasswordSchemaOutput = v.InferOutput<typeof NewPasswordSchema>;
