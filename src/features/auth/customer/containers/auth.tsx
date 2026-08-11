import { Suspense } from "react";

import { getSession } from "@/lib/auth";
import { userHasPassword } from "@/services/auth/customer.service";

import SignInOrSignUp from "./signInOrSignUp";

const AuthHandler = async () => {
  const session = await getSession();
  if (!session?.session) return <SignInOrSignUp />;

  if (!(await userHasPassword(session.user.id))) {
    return (
      <SignInOrSignUp
        forceRegistration
        phoneNumber={session.user.phoneNumber ?? ""}
      />
    );
  }

  return null;
};

const AuthContainer = async () => {
  return (
    <Suspense>
      <AuthHandler />
    </Suspense>
  );
};

export default AuthContainer;
