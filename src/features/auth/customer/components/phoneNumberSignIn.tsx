import { valibotResolver } from "@hookform/resolvers/valibot";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthFormWrapper from "@/components/ui/auth/form";
import PhoneNumberField from "@/components/ui/auth/phoneNumber";
import Button from "@/components/ui/button";
import FormInputError from "@/components/ui/formInputError";
import Spiner from "@/components/ui/spiner";

import { startPhoneAuth } from "../actions/auth";
import { setAuthIntent, setAuthStep, setPhoneNumber } from "../store/auth";
import { PhoneNumberSchemaObject } from "../validation/auth.schema";

const PhoneNumberSignIn = () => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm({
    resolver: valibotResolver(PhoneNumberSchemaObject),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = async ({ phoneNumber }: { phoneNumber: string }) => {
    try {
      const result = await startPhoneAuth({ phoneNumber });

      if (!result.success || !result.data) {
        const message = result.errors?.phoneNumber?.[0] || result.message;
        setError("phoneNumber", { message });
        toast.error(message);
        return;
      }

      setPhoneNumber(phoneNumber);
      setAuthIntent(result.data.intent);
      setAuthStep(result.data.nextStep);

      if (result.data.nextStep === "verify") {
        toast.success("کد تأیید ارسال شد");
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد؛ دوباره تلاش کنید");
    }
  };

  return (
    <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field, fieldState }) => (
          <div
            aria-invalid={fieldState.invalid}
            className="flex flex-col gap-4"
          >
            <PhoneNumberField {...field} />
            <FormInputError error={fieldState.error} />
          </div>
        )}
      />
      <Button
        className="flex center gap-3"
        disabled={isSubmitting}
        variant="secondary"
        type="submit"
      >
        <span>ادامه</span>
        {isSubmitting && <Spiner />}
      </Button>
    </AuthFormWrapper>
  );
};

export default PhoneNumberSignIn;
