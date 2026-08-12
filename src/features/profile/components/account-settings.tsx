"use client";

import { ShieldCheck, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import TextField from "@/components/ui/auth/text";
import { authClient } from "@/lib/auth-client";

import ChangePassword from "./chagePassword";
import PasswordFieldWithLabel from "./passwordField";
import SessionsController from "./sessionsController";

const getErrorMessage = (error: { message?: string } | null) =>
  error?.message || "در انجام عملیات مشکلی پیش آمد؛ دوباره تلاش کنید.";

const DeleteAccountCard = () => {
  const [isPending, startTransition] = useTransition();
  const [showDelete, setShowDelete] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const deleteAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = String(
      new FormData(event.currentTarget).get("deletePassword") ?? "",
    );

    if (confirmation !== "حذف حساب") {
      toast.error("عبارت تأیید را دقیق وارد کنید");
      return;
    }

    startTransition(async () => {
      const { error } = await authClient.deleteUser({ password });

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      window.location.assign("/");
    });
  };

  return (
    <div className="rounded-4xl border border-red-200 bg-red-50/70 p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <div className="center size-12 shrink-0 rounded-2xl bg-red-100 text-error">
          <Trash2 className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-black text-gray-900">حذف همیشگی حساب</h3>
          <p className="mt-1 text-xs leading-6 text-gray-600">
            اطلاعات حساب، نشانی‌ها و سابقه سفارش‌ها برای همیشه حذف می‌شود و قابل
            بازگشت نیست.
          </p>
          {!showDelete ? (
            <button
              className="mt-4 text-sm font-bold text-error underline decoration-red-200 underline-offset-4"
              onClick={() => setShowDelete(true)}
              type="button"
            >
              می‌خواهم حسابم را حذف کنم
            </button>
          ) : (
            <form className="mt-5 space-y-4" onSubmit={deleteAccount}>
              <label
                htmlFor="confirm"
                className="block text-sm font-bold text-gray-700"
              >
                برای تأیید، عبارت «حذف حساب» را بنویسید
                <TextField
                  id="confirm"
                  onChange={(event) => setConfirmation(event.target.value)}
                  value={confirmation}
                />
              </label>
              <PasswordFieldWithLabel label="رمز فعلی" name="deletePassword" />
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-error px-6 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isPending || confirmation !== "حذف حساب"}
                  type="submit"
                >
                  حذف همیشگی حساب
                </button>
                <button
                  className="rounded-full border border-red-200 px-6 py-2.5 text-sm font-bold text-gray-700"
                  onClick={() => {
                    setShowDelete(false);
                    setConfirmation("");
                  }}
                  type="button"
                >
                  منصرف شدم
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

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
        <DeleteAccountCard />
        <div className="flex items-center gap-2 rounded-2xl bg-secondary-500/5 px-4 py-3 text-xs leading-6 text-secondary-800">
          <ShieldCheck className="size-4 shrink-0" />
          هیچ‌وقت رمز عبور یا کد یک‌بارمصرف خود را در اختیار دیگران قرار ندهید.
        </div>
      </div>
    </div>
  </section>
);
