import { UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

import type { CustomerProfileData } from "../types";

import EditFullname from "./editFullname";

const inputClassName =
  "w-full rounded-2xl border border-primary-300 bg-primary-25 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-primary-600/60 focus:border-secondary-500 focus:bg-white focus:ring-4 focus:ring-secondary-500/10 disabled:cursor-not-allowed disabled:opacity-70";

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
        className={cn(inputClassName, "dir-ltr text-left", {
          "border-success": isVerified,
        })}
        disabled
        value={value}
      />
    </div>
  </label>
);

const AccountSettings = ({ user }: { user: CustomerProfileData["user"] }) => {
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
      <div className="rounded-4xl border border-primary-300 bg-white p-5 sm:p-7">
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
          <EditFullname name={user.name} />
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
            value={user.email}
          />
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;
