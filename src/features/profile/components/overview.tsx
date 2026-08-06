import type { LucideIcon } from "lucide-react";

import {
  ArrowLeft,
  CircleDollarSign,
  MapPin,
  ShoppingBag,
  Truck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import type { CustomerProfileData, ProfileTab } from "../types";

import { formatCurrency, getProfileCompletion } from "../utils";
import OrderCard from "./orderCard";
import { EmptyOrders } from "./ordersList";

const StatsGrid = ({
  stats,
}: {
  stats: {
    label: string;
    value: string;
    detail: string;
    icon: LucideIcon;
    tone: string;
  }[];
}) => (
  <section
    aria-label="خلاصه حساب"
    className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
  >
    {stats.map((stat) => {
      const Icon = stat.icon;
      return (
        <article
          className="rounded-4xl border border-primary-300 bg-white p-5 shadow-blur-sm"
          key={stat.label}
        >
          <div className={`center mb-7 size-11 rounded-2xl ${stat.tone}`}>
            <Icon className="size-5" />
          </div>
          <strong className="block text-xl font-black text-gray-900">
            {stat.value}
          </strong>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-gray-700">
              {stat.label}
            </span>
            <span className="text-[11px] text-primary-900">{stat.detail}</span>
          </div>
        </article>
      );
    })}
  </section>
);

const Overview = ({
  profile,
  onNavigate,
}: {
  profile: CustomerProfileData;
  onNavigate: (tab: ProfileTab) => void;
}) => {
  const activeOrders = profile.orders.filter((order) =>
    ["paid", "paying", "pending"].includes(order.status),
  ).length;
  const deliveredOrders = profile.orders.filter(
    (order) => order.status === "delivered",
  );
  const totalSpent = deliveredOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0,
  );
  const completion = getProfileCompletion(profile);

  const stats = [
    {
      label: "همه سفارش‌ها",
      value: profile.orders.length.toLocaleString("fa-IR"),
      detail: "سفارش ثبت‌شده",
      icon: ShoppingBag,
      tone: "bg-secondary-500/10 text-secondary-600",
    },
    {
      label: "سفارش فعال",
      value: activeOrders.toLocaleString("fa-IR"),
      detail: "در مسیر تکمیل",
      icon: Truck,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "نشانی‌ها",
      value: profile.addresses.length.toLocaleString("fa-IR"),
      detail: "نشانی ذخیره‌شده",
      icon: MapPin,
      tone: "bg-thready-200 text-thready-900",
    },
    {
      label: "خرید موفق",
      value: formatCurrency(totalSpent),
      detail: `${deliveredOrders.length.toLocaleString("fa-IR")} سفارش تحویل‌شده`,
      icon: CircleDollarSign,
      tone: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="space-y-5">
      <StatsGrid stats={stats} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.7fr)]">
        <section className="rounded-4xl border border-primary-300 bg-white p-5 shadow-blur-sm sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">
                سفارش‌های اخیر
              </h2>
              <p className="mt-1 text-xs leading-5 text-primary-900">
                آخرین وضعیت خریدهای شما
              </p>
            </div>
            {profile.orders.length > 0 && (
              <button
                className="inline-flex items-center gap-1 text-xs font-bold text-secondary-600 transition hover:text-secondary-800"
                onClick={() => onNavigate("orders")}
                type="button"
              >
                مشاهده همه
                <ArrowLeft className="size-3.5" />
              </button>
            )}
          </div>
          {profile.orders.length === 0 ? (
            <EmptyOrders compact />
          ) : (
            <div className="space-y-3">
              {profile.orders.slice(0, 3).map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>

        <div className="space-y-5">
          <section className="rounded-4xl border border-primary-300 bg-gray-900 p-6 text-white shadow-blur-sm">
            <div className="flex items-center justify-between">
              <div className="center size-11 rounded-2xl bg-white/10">
                <UserRound className="size-5" />
              </div>
              <span className="text-xl font-black">
                ٪{completion.toLocaleString("fa-IR")}
              </span>
            </div>
            <h2 className="mt-7 font-black">تکمیل حساب</h2>
            <p className="mt-2 text-xs leading-6 text-white/65">
              با تکمیل اطلاعات تماس و نشانی، سفارش‌ها سریع‌تر پردازش می‌شوند.
            </p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                aria-label={`${completion} درصد تکمیل شده`}
                className="h-full rounded-full bg-thready-500 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            {completion < 100 && (
              <button
                className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-white"
                onClick={() =>
                  onNavigate(profile.addresses.length ? "account" : "addresses")
                }
                type="button"
              >
                تکمیل اطلاعات
                <ArrowLeft className="size-3.5" />
              </button>
            )}
          </section>

          <Link
            className="group flex items-center justify-between rounded-4xl border border-primary-300 bg-thready-200 p-5 transition hover:border-thready-800/40"
            href="/cart"
          >
            <div className="flex items-center gap-3">
              <span className="center size-11 rounded-2xl bg-white text-thready-900">
                <ShoppingBag className="size-5" />
              </span>
              <div>
                <strong className="block text-sm font-black text-gray-900">
                  سبد خرید
                </strong>
                <span className="mt-1 block text-xs text-primary-900">
                  {profile.cartItemCount.toLocaleString("fa-IR")} کالا آماده
                  ادامه خرید
                </span>
              </div>
            </div>
            <ArrowLeft className="size-4 transition group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
