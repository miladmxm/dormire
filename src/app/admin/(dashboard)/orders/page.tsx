import type { Metadata } from "next";

import { Suspense } from "react";

import { OrdersOverviewSkeleton } from "@/features/order/components/ordersSkeleton";
import AllOrders from "@/features/order/containers/allOrders";

export const metadata: Metadata = {
  title: "مدیریت سفارش‌ها | پنل ادمین",
  description: "مشاهده، جست‌وجو و مدیریت سفارش‌های فروشگاه",
};

export const prefetch = "partial";

const OrdersPage = () => {
  return (
    <section className="flex flex-col gap-6">
      <header data-testid="orders-shell-marker">
        <h1 className="text-2xl font-semibold tracking-tight">
          مدیریت سفارش‌ها
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          وضعیت پرداخت و ارسال سفارش‌ها را بررسی و به‌روزرسانی کنید.
        </p>
      </header>
      <Suspense fallback={<OrdersOverviewSkeleton />}>
        <AllOrders />
      </Suspense>
    </section>
  );
};

export default OrdersPage;
