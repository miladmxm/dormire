import type { ReactNode } from "react";

import type { AuthSteps } from "../store/auth";

import CompleteRegistration from "../components/completeRegistration";
import PasswordSignIn from "../components/passwordSignIn";
import PhoneNumberSignIn from "../components/phoneNumberSignIn";
import VerifySignIn from "../components/verifySignIn";
import { useAuthStore } from "../store/auth";

const steps: Partial<Record<AuthSteps, ReactNode>> = {
  phoneNumber: <PhoneNumberSignIn />,
  password: <PasswordSignIn />,
  verify: <VerifySignIn />,
  registration: <CompleteRegistration />,
};

const SignIn = ({
  forceRegistration,
  phoneNumber,
}: {
  forceRegistration?: boolean;
  phoneNumber?: string;
}) => {
  const step = useAuthStore((state) => state.step);

  if (forceRegistration) {
    return <CompleteRegistration phoneNumber={phoneNumber} />;
  }

  return <>{steps[step] || null}</>;
};

export default SignIn;
