"use client";

import DialogWrapper from "../components/dialogWrapper";
import SignIn from "./signIn";

const SignInOrSignUp = ({
  forceRegistration = false,
  phoneNumber,
}: {
  forceRegistration?: boolean;
  phoneNumber?: string;
}) => {
  return (
    <DialogWrapper
      forceOpen={forceRegistration}
      title={forceRegistration ? "تکمیل ثبت‌نام" : "ورود یا ثبت نام"}
    >
      <SignIn forceRegistration={forceRegistration} phoneNumber={phoneNumber} />
    </DialogWrapper>
  );
};

export default SignInOrSignUp;
