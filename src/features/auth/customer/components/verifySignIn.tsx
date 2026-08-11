"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthFormWrapper from "@/components/ui/auth/form";
import OTPfield from "@/components/ui/auth/OTP";
import Button from "@/components/ui/button";
import FormInputError from "@/components/ui/formInputError";
import SmallTextButton from "@/components/ui/smallTextButton";
import Spiner from "@/components/ui/spiner";
import { authClient, getErrorMessage } from "@/lib/auth-client";

import { resetAuth, setAuthStep, useAuthStore } from "../store/auth";
import { VerifyOTPschema } from "../validation/auth.schema";
import ResendCode from "./resendCode";

const VerifySignIn = () => {
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const intent = useAuthStore((state) => state.intent);
  const router = useRouter();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm({
    resolver: valibotResolver(VerifyOTPschema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async ({ code }: { code: string }) => {
    try {
      const { error } = await authClient.phoneNumber.verify({
        phoneNumber,
        code,
        updatePhoneNumber: false,
      });

      if (error) {
        const message = getErrorMessage(error);
        setError("code", { message });
        toast.error(message);
        return;
      }

      if (intent === "registration") {
        setAuthStep("registration");
        return;
      }

      resetAuth();
      router.refresh();
    } catch {
      toast.error("تأیید کد انجام نشد؛ دوباره تلاش کنید");
    }
  };

  const resend = async () => {
    try {
      const { error } = await authClient.phoneNumber.sendOtp({ phoneNumber });

      if (error) {
        toast.error(getErrorMessage(error));
        return false;
      }

      toast.success("کد جدید ارسال شد");
      return true;
    } catch {
      toast.error("ارسال دوباره کد انجام نشد");
      return false;
    }
  };

  return (
    <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="code"
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-2">
            <OTPfield {...field} />
            <FormInputError error={fieldState.error} />
          </div>
        )}
      />
      <div className="flex justify-between">
        <SmallTextButton onClick={() => setAuthStep("phoneNumber")}>
          تغییر شماره
        </SmallTextButton>
        <ResendCode onClick={resend} />
      </div>
      <Button
        className="flex center gap-3"
        disabled={isSubmitting}
        variant="secondary"
        type="submit"
      >
        <span>تأیید کد</span>
        {isSubmitting && <Spiner />}
      </Button>
    </AuthFormWrapper>
  );
};

export default VerifySignIn;
