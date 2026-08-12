"use client";

import ChangePassword from "./chagePassword";
import DeleteAccount from "./deleteAccount";
import PasswordAlert from "./passwordAlert";
import SessionsController from "./sessionsController";

export const SecuritySettings = () => (
  <section aria-labelledby="security-heading">
    <div className="mb-6">
      <h2 className="text-2xl font-black text-gray-900" id="security-heading">
        امنیت و ورود
      </h2>
      <p className="mt-1 text-sm leading-6 text-primary-900">
        رمز قوی و کنترل نشست‌ها، حساب شما را امن نگه می‌دارد.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-5 max-xl:grid-cols-1">
      <div className="flex flex-col gap-5">
        <ChangePassword />
        <PasswordAlert />
      </div>
      <div className="flex flex-col gap-5">
        <SessionsController />
        <DeleteAccount />
      </div>
    </div>
  </section>
);
