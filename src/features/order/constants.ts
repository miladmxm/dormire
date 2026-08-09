import type { LucideIcon } from "lucide-react";

import {
  CircleCheckBig,
  CircleX,
  Clock3,
  PackageCheck,
  WalletCards,
} from "lucide-react";

import type {
  OrderStatus,
  PaymentGateway,
  SendingMethod,
} from "@/services/shipping/type";

export const orderStatusDetails: Record<
  OrderStatus,
  {
    label: string;
    description: string;
    variant: "default" | "destructive" | "outline" | "secondary";
    icon: LucideIcon;
  }
> = {
  pending: {
    label: "در انتظار پرداخت",
    description: "سفارش ایجاد شده و هنوز پرداخت نشده است.",
    variant: "outline",
    icon: Clock3,
  },
  paying: {
    label: "در حال پرداخت",
    description: "مشتری به درگاه پرداخت منتقل شده است.",
    variant: "secondary",
    icon: WalletCards,
  },
  paid: {
    label: "پرداخت‌شده",
    description: "پرداخت تأیید شده و سفارش آماده پردازش است.",
    variant: "secondary",
    icon: PackageCheck,
  },
  delivered: {
    label: "تحویل‌شده",
    description: "سفارش با موفقیت به مشتری تحویل شده است.",
    variant: "default",
    icon: CircleCheckBig,
  },
  cancelled: {
    label: "لغوشده",
    description: "فرآیند سفارش یا پرداخت لغو شده است.",
    variant: "destructive",
    icon: CircleX,
  },
};

export const sendingMethodLabels: Record<SendingMethod, string> = {
  personReception: "تحویل حضوری",
  storeSend: "ارسال توسط فروشگاه",
};

export const paymentGatewayLabels: Record<PaymentGateway, string> = {
  saman: "بانک سامان",
  zarinpal: "زرین‌پال",
};
