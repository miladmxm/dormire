"use client";

import type { LucideIcon } from "lucide-react";

import {
  ArrowLeft,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  LayoutDashboard,
  MapPin,
  PackageCheck,
  PackageOpen,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
  WalletCards,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { OrderStatus } from "@/services/shipping/type";

import type { CustomerProfileData, CustomerProfileOrder } from "../types";

import { AccountSettings, SecuritySettings } from "./account-settings";
import AddressManager from "./address-manager";

type ProfileTab = "account" | "addresses" | "orders" | "overview" | "security";

interface TabItem {
  id: ProfileTab;
  label: string;
  icon: LucideIcon;
}

const tabs: TabItem[] = [
  { id: "overview", label: "نمای کلی", icon: LayoutDashboard },
  { id: "orders", label: "سفارش‌ها", icon: PackageOpen },
  { id: "addresses", label: "نشانی‌ها", icon: MapPin },
  { id: "account", label: "اطلاعات حساب", icon: UserRound },
  { id: "security", label: "امنیت و ورود", icon: ShieldCheck },
];

const statusDetails: Record<
  OrderStatus,
  { label: string; className: string; icon: LucideIcon }
> = {
  pending: {
    label: "در انتظار پرداخت",
    className: "bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  paying: {
    label: "در حال پرداخت",
    className: "bg-blue-50 text-blue-700",
    icon: WalletCards,
  },
  paid: {
    label: "در حال آماده‌سازی",
    className: "bg-violet-50 text-violet-700",
    icon: PackageCheck,
  },
  delivered: {
    label: "تحویل‌شده",
    className: "bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "لغوشده",
    className: "bg-red-50 text-red-600",
    icon: XCircle,
  },
};

const formatCurrency = (value: number) =>
  `${new Intl.NumberFormat("fa-IR").format(Math.round(value / 10))} تومان`;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
};

const getProfileCompletion = (profile: CustomerProfileData) => {
  const hasRealEmail = !profile.user.email.endsWith("@dormire.com");
  const completed = [
    profile.user.name.trim().length >= 3,
    Boolean(profile.user.phoneNumber && profile.user.phoneNumberVerified),
    Boolean(hasRealEmail && profile.user.emailVerified),
    profile.addresses.length > 0,
  ].filter(Boolean).length;

  return completed * 25;
};

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const details = statusDetails[status];
  const Icon = details.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${details.className}`}
    >
      <Icon className="size-3.5" />
      {details.label}
    </span>
  );
};

const EmptyOrders = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={`flex flex-col items-center justify-center rounded-4xl border border-dashed border-primary-500 bg-primary-50/70 px-6 text-center ${compact ? "min-h-52 py-7" : "min-h-80 py-10"}`}
  >
    <div className="center mb-4 size-14 rounded-3xl bg-thready-500 text-thready-900">
      <ShoppingBag className="size-6" />
    </div>
    <h3 className="font-black text-gray-900">هنوز سفارشی ثبت نشده</h3>
    <p className="mt-2 max-w-sm text-sm leading-7 text-primary-900">
      محصولات دلخواهتان را ببینید و اولین خرید خود را شروع کنید.
    </p>
    <Link
      className="mt-5 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-secondary-800"
      href="/shop"
    >
      رفتن به فروشگاه
    </Link>
  </div>
);

const OrderCard = ({ order }: { order: CustomerProfileOrder }) => (
  <article className="rounded-3xl border border-primary-300 bg-white p-4 transition hover:border-thready-800/40 sm:p-5">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <div className="center size-11 shrink-0 rounded-2xl bg-primary-200 text-gray-700">
          <PackageOpen className="size-5" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-black text-gray-900">
              سفارش
              <span className="mr-1 font-mono" dir="ltr">
                #{order.id.slice(0, 8).toUpperCase()}
              </span>
            </h3>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-xs text-primary-900">
            {formatDate(order.createdAt)} ·{" "}
            {order.items.length.toLocaleString("fa-IR")} قلم
          </p>
        </div>
      </div>
      <div className="sm:text-left">
        <span className="block text-xs text-primary-900">مبلغ کل</span>
        <strong className="mt-1 block text-sm font-black text-gray-900">
          {formatCurrency(order.totalPrice)}
        </strong>
      </div>
    </div>

    {order.items.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2 border-t border-primary-200 pt-4">
        {order.items.slice(0, 4).map((item) => (
          <Link
            className="rounded-full bg-primary-50 px-3 py-1.5 text-xs text-primary-900 transition hover:bg-thready-200 hover:text-gray-900"
            href={`/product/${item.product.slug}`}
            key={item.id}
          >
            {item.product.name}
            {item.quantity > 1 && (
              <span className="mr-1 font-bold">
                ×{item.quantity.toLocaleString("fa-IR")}
              </span>
            )}
          </Link>
        ))}
        {order.items.length > 4 && (
          <span className="rounded-full bg-primary-50 px-3 py-1.5 text-xs text-primary-900">
            +{(order.items.length - 4).toLocaleString("fa-IR")} محصول دیگر
          </span>
        )}
      </div>
    )}
  </article>
);

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

const Orders = ({ orders }: { orders: CustomerProfileOrder[] }) => (
  <section aria-labelledby="orders-heading">
    <div className="mb-6">
      <h2 className="text-2xl font-black text-gray-900" id="orders-heading">
        سفارش‌های من
      </h2>
      <p className="mt-1 text-sm leading-6 text-primary-900">
        وضعیت و جزئیات همه خریدهای ثبت‌شده
      </p>
    </div>
    {orders.length === 0 ? (
      <EmptyOrders />
    ) : (
      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    )}
  </section>
);

const ProfileDashboard = ({ profile }: { profile: CustomerProfileData }) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const memberSince = new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    year: "numeric",
  }).format(new Date(profile.user.createdAt));

  return (
    <div
      className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]"
      data-testid="profile-dynamic-content"
    >
      <aside className="h-fit rounded-4xl border border-primary-300 bg-white/90 p-4 shadow-blur-sm backdrop-blur lg:sticky lg:top-5 max-lg:overflow-hidden max-lg:max-w-full">
        <div className="flex items-center gap-3 border-b border-primary-200 px-1 pb-5 pt-1">
          <div className="center size-14 shrink-0 rounded-3xl bg-linear-to-br from-secondary-500 to-secondary-800 text-lg font-black text-white shadow-lg shadow-secondary-500/20">
            {getInitials(profile.user.name) || <UserRound className="size-6" />}
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-black text-gray-900">
              {profile.user.name}
            </h2>
            <p className="mt-1 truncate text-xs text-primary-900">
              عضو از {memberSince}
            </p>
          </div>
        </div>

        <nav
          aria-label="بخش‌های حساب کاربری"
          className="mt-4 overflow-x-auto pb-1 lg:overflow-visible max-w-full"
        >
          <div className="flex gap-2 lg:block lg:space-y-1 w-max min-w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition lg:w-full ${
                    isActive
                      ? "bg-gray-900 text-white shadow-lg shadow-gray-900/10"
                      : "text-primary-900 hover:bg-primary-200 hover:text-gray-900"
                  }`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  <Icon className="size-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-4 hidden rounded-3xl bg-thready-200 p-4 lg:block">
          <div className="flex items-center gap-2 text-xs font-black text-gray-900">
            <ShieldCheck className="size-4 text-thready-900" />
            حساب امن
          </div>
          <p className="mt-2 text-[11px] leading-5 text-primary-900">
            اطلاعات پرداخت در حساب شما نگهداری نمی‌شود.
          </p>
        </div>
      </aside>

      <div className="min-w-0 max-w-full" key={activeTab}>
        {activeTab === "overview" && (
          <Overview onNavigate={setActiveTab} profile={profile} />
        )}
        {activeTab === "orders" && <Orders orders={profile.orders} />}
        {activeTab === "addresses" && (
          <AddressManager addresses={profile.addresses} />
        )}
        {activeTab === "account" && <AccountSettings user={profile.user} />}
        {activeTab === "security" && <SecuritySettings />}
      </div>
    </div>
  );
};

export default ProfileDashboard;
