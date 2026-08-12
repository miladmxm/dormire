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

const PasswordSchema = v.pipe(
  v.string("این فیلد اجباری است"),
  v.nonEmpty("نمیتواند خالی باشد"),
  v.trim(),
  v.minLength(8, "حداقل باید ۸ کاراکتر باشد"),
  v.maxLength(256, "حداکثر میتواند ۲۵۶ کاراکتر باشد"),
);
export const ResetPasswordSchema = v.pipe(
  v.object({
    newPassword: PasswordSchema,
    confirmNewPassword: v.pipe(
      v.string("این فیلد اجباری است"),
      v.nonEmpty("نمیتواند خالی باشد"),
      v.trim(),
    ),
    oldPassword: PasswordSchema,
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
