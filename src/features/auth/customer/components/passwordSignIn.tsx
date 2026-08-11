import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthFormWrapper from "@/components/ui/auth/form";
import PasswordField from "@/components/ui/auth/password";
import Button from "@/components/ui/button";
import FormInputError from "@/components/ui/formInputError";
import SmallTextButton from "@/components/ui/smallTextButton";
import Spiner from "@/components/ui/spiner";
import { authClient, getErrorMessage } from "@/lib/auth-client";

import {
  resetAuth,
  setAuthIntent,
  setAuthStep,
  useAuthStore,
} from "../store/auth";
import { PasswordSchemaObject } from "../validation/auth.schema";

const PasswordSignIn = () => {
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const router = useRouter();
  const [isSendingCode, setIsSendingCode] = useState(false);
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: valibotResolver(PasswordSchemaObject),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      const { error } = await authClient.signIn.phoneNumber({
        password,
        phoneNumber,
        rememberMe: true,
      });

      if (error) {
        if (error.code === "PHONE_NUMBER_NOT_VERIFIED") {
          setAuthIntent("signIn");
          setAuthStep("verify");
          toast.success("کد تأیید ارسال شد");
          return;
        }

        toast.error(getErrorMessage(error));
        return;
      }

      resetAuth();
      router.refresh();
    } catch {
      toast.error("ارتباط با سرور برقرار نشد؛ دوباره تلاش کنید");
    }
  };

  const requestForOTP = async () => {
    setIsSendingCode(true);

    try {
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber,
      });

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      setAuthIntent("signIn");
      setAuthStep("verify");
      toast.success("کد ورود ارسال شد");
    } catch {
      toast.error("ارسال کد انجام نشد؛ دوباره تلاش کنید");
    } finally {
      setIsSendingCode(false);
    }
  };

  return (
    <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <div
            aria-invalid={fieldState.invalid}
            className="flex flex-col gap-2"
          >
            <PasswordField {...field} />
            <FormInputError error={fieldState.error} />
          </div>
        )}
      />
      <div className="flex flex-col ">
        <SmallTextButton onClick={() => setAuthStep("phoneNumber")}>
          تغییر شماره
        </SmallTextButton>
        <SmallTextButton disabled={isSendingCode} onClick={requestForOTP}>
          {isSendingCode ? "در حال ارسال کد..." : "رمز را فراموش کرده‌ام"}
        </SmallTextButton>
      </div>
      <Button
        className="flex center gap-3"
        disabled={isSubmitting || isSendingCode}
        variant="secondary"
        type="submit"
      >
        <span>ورود</span>
        {isSubmitting && <Spiner />}
      </Button>
    </AuthFormWrapper>
  );
};

export default PasswordSignIn;
