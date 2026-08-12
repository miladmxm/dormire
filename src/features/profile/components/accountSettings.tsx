"use client";

import { ShieldCheck } from "lucide-react";

import ChangePassword from "./chagePassword";
import DeleteAccount from "./deleteAccount";
import SessionsController from "./sessionsController";

const getErrorMessage = (error: { message?: string } | null) =>
  error?.message || "در انجام عملیات مشکلی پیش آمد؛ دوباره تلاش کنید.";

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
      <div>
        <ChangePassword />
      </div>
      <div className="flex flex-col gap-5">
        <SessionsController />
        <DeleteAccount />
        <div className="flex items-center gap-2 rounded-2xl bg-secondary-500/5 px-4 py-3 text-xs leading-6 text-secondary-800">
          <ShieldCheck className="size-4 shrink-0" />
          هیچ‌وقت رمز عبور یا کد یک‌بارمصرف خود را در اختیار دیگران قرار ندهید.
        </div>
      </div>
    </div>
  </section>
);
