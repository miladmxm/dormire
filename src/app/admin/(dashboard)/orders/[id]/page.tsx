import type { Metadata } from "next";

import { Suspense } from "react";

import { OrderDetailsSkeleton } from "@/features/order/components/ordersSkeleton";
import OrderDetailsContainer from "@/features/order/containers/orderDetails";

export const metadata: Metadata = {
  title: "جزئیات سفارش | پنل ادمین",
  description: "بررسی اطلاعات مشتری، پرداخت، ارسال و اقلام سفارش",
};

export const prefetch = "partial";

const OrderDetailsPage = ({ params }: PageProps<"/admin/orders/[id]">) => {
  return (
    <section className="flex flex-col gap-6">
      <header data-testid="order-details-shell-marker">
        <h1 className="text-2xl font-semibold tracking-tight">جزئیات سفارش</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          اطلاعات کامل سفارش و روند انجام آن را مدیریت کنید.
        </p>
      </header>
      <Suspense fallback={<OrderDetailsSkeleton />}>
        <OrderDetailsContainer params={params} />
      </Suspense>
    </section>
  );
};

export default OrderDetailsPage;
