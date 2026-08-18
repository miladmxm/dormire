import { adminClient, phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [phoneNumberClient(), adminClient()],
});
const ErrorMessages: Record<string, string> = {
  INVALID_PHONE_NUMBER_OR_PASSWORD: "شماره تلفن یا رمز عبور اشتباه است",
  INVALID_PHONE_NUMBER: "شماره تلفن معتبر نیست",
  INVALID_OTP: "کد واردشده صحیح نیست",
  OTP_EXPIRED: "زمان استفاده از کد به پایان رسیده است",
  OTP_NOT_FOUND: "کدی برای این شماره پیدا نشد؛ دوباره درخواست کد بدهید",
  PASSWORD_TOO_LONG: "رمز عبور بیش از حد طولانی است",
  PASSWORD_TOO_SHORT: "رمز عبور باید حداقل ۸ کاراکتر باشد",
  PHONE_NUMBER_NOT_VERIFIED: "شماره تلفن هنوز تأیید نشده است",
  TOO_MANY_ATTEMPTS: "تعداد تلاش‌ها بیش از حد مجاز است؛ کد جدید بگیرید",
  UNEXPECTED_ERROR: "در احراز هویت مشکلی پیش آمد",
};
const DEFAULT_MESSAGE = "خطا در احراز هویت";

export const getErrorMessage = ({
  code,
  message,
}: {
  message?: string;
  code?: string;
}): string => {
  if (!code) return message || DEFAULT_MESSAGE;
  return ErrorMessages[code] || message || DEFAULT_MESSAGE;
};
