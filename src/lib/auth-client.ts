import { phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [phoneNumberClient()],
});
const ErrorMessages: Record<string, string> = {
  INVALID_PHONE_NUMBER_OR_PASSWORD: "شماره تلفن یا رمز عبور اشتباه است",
};
const DEFULT_MESSAGE = "خطا در احراز هوبت";

export const getErrorMessage = ({
  code,
  message,
}: {
  message?: string;
  code?: string;
}): string => {
  if (!code) return message || DEFULT_MESSAGE;
  return ErrorMessages[code] || message || DEFULT_MESSAGE;
};
