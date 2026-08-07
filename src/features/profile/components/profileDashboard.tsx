"use client";

import {
  LayoutDashboard,
  MapPin,
  PackageOpen,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import type { CustomerProfileData, ProfileTab, TabItem } from "../types";

import { getInitials } from "../utils";
import { SecuritySettings } from "./account-settings";
import AccountSettings from "./acountSettings";
import AddressManager from "./addressManager";
import OrdersList from "./ordersList";
import Overview from "./overview";

const tabs: TabItem[] = [
  { id: "overview", label: "نمای کلی", icon: LayoutDashboard },
  { id: "orders", label: "سفارش‌ها", icon: PackageOpen },
  { id: "addresses", label: "نشانی‌ها", icon: MapPin },
  { id: "account", label: "اطلاعات حساب", icon: UserRound },
  { id: "security", label: "امنیت و ورود", icon: ShieldCheck },
];

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
        {activeTab === "orders" && <OrdersList orders={profile.orders} />}
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
