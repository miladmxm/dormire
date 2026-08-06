import type { Metadata } from "next";

import { Suspense } from "react";

import ProfileSkeleton from "@/features/profile/components/profileSkeleton";
import CustomerProfile from "@/features/profile/containers/customerProfile";

export const metadata: Metadata = {
  title: "حساب کاربری | یاتاک مد",
  description: "مدیریت حساب، سفارش‌ها و آدرس‌های مشتری",
};

export const prefetch = "partial";

const ProfilePage = () => {
  return (
    <main className="relative z-10 isolate min-h-[75vh] overflow-hidden pb-24 pt-8 sm:pt-12">
      <div
        aria-hidden="true"
        className="absolute -right-36 top-12 -z-10 size-96 rounded-full bg-thready-500/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-72 -z-10 size-80 rounded-full bg-secondary-500/10 blur-3xl"
      />

      <section className="container" data-testid="profile-shell-marker">
        <header className="mb-7 sm:mb-10">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-thready-900">
            <span className="h-px w-8 bg-thready-800/60" />
            حساب من
          </div>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                فضای شخصی شما
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-7 text-primary-900 sm:text-base">
                سفارش‌ها، نشانی‌های تحویل و امنیت حساب را یک‌جا مدیریت کنید.
              </p>
            </div>
            <span className="w-fit rounded-full border border-primary-300 bg-white/70 px-4 py-2 text-xs text-primary-900 shadow-blur-sm backdrop-blur">
              خرید راحت‌تر، پیگیری سریع‌تر
            </span>
          </div>
        </header>

        <Suspense fallback={<ProfileSkeleton />}>
          <CustomerProfile />
        </Suspense>
      </section>
    </main>
  );
};

export default ProfilePage;
