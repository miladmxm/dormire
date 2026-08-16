import type { LucideIcon } from "lucide-react";
import type { Route } from "next";

import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  PackageOpen,
  WalletCards,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import type { OrderStatus } from "@/services/shipping/type";

import Button from "@/components/ui/button";

import type { CustomerProfileOrder } from "../types";

import { formatCurrency, formatDate } from "../utils";

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
    <div className="flex justify-between border-t border-primary-200 pt-4 mt-4">
      {order.items.length > 0 && (
        <div className="flex flex-wrap gap-2 ">
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
      <div>
        {["paying", "pending"].includes(order.status) && (
          <Button
            href={`/checkout/${order.id}` as Route}
            variant="secondary"
            size="sm"
          >
            پرداخت
          </Button>
        )}
      </div>
    </div>
  </article>
);
export default OrderCard;
