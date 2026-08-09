import {
  CircleCheckBig,
  Clock3,
  PackageCheck,
  ShoppingBag,
  WalletCards,
} from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";

import type { AdminOrderListItem } from "../types";

import { formatOrderCurrency } from "../utils";

const OrderStats = ({ orders }: { orders: AdminOrderListItem[] }) => {
  const awaitingPayment = orders.filter((order) =>
    ["paying", "pending"].includes(order.status),
  ).length;
  const processing = orders.filter((order) => order.status === "paid").length;
  const delivered = orders.filter(
    (order) => order.status === "delivered",
  ).length;
  const realizedRevenue = orders
    .filter((order) => ["delivered", "paid"].includes(order.status))
    .reduce((total, order) => total + order.totalPrice, 0);

  const stats = [
    {
      title: "کل سفارش‌ها",
      value: orders.length.toLocaleString("fa-IR"),
      description: "همه سفارش‌های ثبت‌شده",
      icon: ShoppingBag,
    },
    {
      title: "در انتظار پرداخت",
      value: awaitingPayment.toLocaleString("fa-IR"),
      description: "نیازمند پیگیری پرداخت",
      icon: Clock3,
    },
    {
      title: "در حال پردازش",
      value: processing.toLocaleString("fa-IR"),
      description: "پرداخت‌شده و آماده ارسال",
      icon: PackageCheck,
    },
    {
      title: "تحویل‌شده",
      value: delivered.toLocaleString("fa-IR"),
      description: "سفارش‌های تکمیل‌شده",
      icon: CircleCheckBig,
    },
    {
      title: "فروش قطعی",
      value: formatOrderCurrency(realizedRevenue),
      description: "مجموع سفارش‌های پرداخت‌شده",
      icon: WalletCards,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {stats.map(({ description, icon: Icon, title, value }) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <CardAction>
              <Icon className="text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderStats;
