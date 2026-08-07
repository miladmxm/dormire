import { CheckCircle2, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { authClient, getErrorMessage } from "@/lib/auth-client";

import type { CustomerProfileData } from "../types";

const inputClassName =
  "mt-2 w-full rounded-2xl border border-primary-300 bg-primary-25 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-primary-600/60 focus:border-secondary-500 focus:bg-white focus:ring-4 focus:ring-secondary-500/10 disabled:cursor-not-allowed disabled:opacity-70";

const displayEmail = (email: string) =>
  email.endsWith("@dormire.com") ? "ایمیل ثبت نشده" : email;

const IdentityField = ({
  isVerified,
  label,
  value,
}: {
  isVerified: boolean;
  label: string;
  value: string;
}) => (
  <label className="block text-sm font-bold text-gray-700">
    {label}
    <div className="relative">
      <input
        className={`${inputClassName} dir-ltr text-left`}
        disabled
        value={value}
      />
      {isVerified && (
        <CheckCircle2 className="absolute left-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-success" />
      )}
    </div>
  </label>
);

const AccountSettings = ({ user }: { user: CustomerProfileData["user"] }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(user.name);

  const updateProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedName = name.trim();

    if (normalizedName.length < 3 || normalizedName.length > 80) {
      toast.error("نام باید بین ۳ تا ۸۰ حرف باشد");
      return;
    }

    startTransition(async () => {
      const { error } = await authClient.updateUser({ name: normalizedName });

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      toast.success("اطلاعات حساب به‌روزرسانی شد");
      router.refresh();
    });
  };

  return (
    <section aria-labelledby="account-heading" className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900" id="account-heading">
          اطلاعات حساب
        </h2>
        <p className="mt-1 text-sm leading-6 text-primary-900">
          نام نمایشی شما در سفارش‌ها و ارتباط با پشتیبانی استفاده می‌شود.
        </p>
      </div>
      <form
        className="rounded-4xl border border-primary-300 bg-white p-5 sm:p-7"
        onSubmit={updateProfile}
      >
        <div className="mb-6 flex items-center gap-4 border-b border-primary-200 pb-6">
          <div className="center size-14 rounded-3xl bg-secondary-500/10 text-secondary-600">
            <UserRound className="size-6" />
          </div>
          <div>
            <h3 className="font-black text-gray-900">مشخصات اصلی</h3>
            <p className="mt-1 text-xs leading-5 text-primary-900">
              برای تغییر شناسه‌های ورود، ابتدا باید هویت شما تأیید شود.
            </p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-bold text-gray-700 sm:col-span-2">
            نام و نام خانوادگی
            <input
              autoComplete="name"
              className={inputClassName}
              maxLength={80}
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </label>
          <IdentityField
            isVerified={user.phoneNumberVerified}
            label="شماره موبایل"
            value={user.phoneNumber ?? "ثبت نشده"}
          />
          <IdentityField
            isVerified={
              user.emailVerified && !user.email.endsWith("@dormire.com")
            }
            label="ایمیل"
            value={displayEmail(user.email)}
          />
        </div>
        <div className="mt-6 flex justify-end border-t border-primary-200 pt-5">
          <button
            className="rounded-full bg-secondary-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-secondary-500/20 transition hover:bg-secondary-600 disabled:cursor-wait disabled:opacity-60"
            disabled={isPending || name.trim() === user.name}
            type="submit"
          >
            {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AccountSettings;
