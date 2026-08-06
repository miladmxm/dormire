import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import type { CustomerProfileOrder } from "../types";

import OrderCard from "./orderCard";

export const EmptyOrders = ({ compact = false }: { compact?: boolean }) => (
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

const OrdersList = ({ orders }: { orders: CustomerProfileOrder[] }) => (
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

export default OrdersList;
