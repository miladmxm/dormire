import {
  CreditCard,
  MapPin,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/dashboard/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Separator } from "@/components/dashboard/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/ui/table";

import type { AdminOrderDetails } from "../types";

import { paymentGatewayLabels, sendingMethodLabels } from "../constants";
import {
  formatOrderCurrency,
  formatOrderDate,
  getShortOrderId,
} from "../utils";
import OrderStatusBadge from "./orderStatusBadge";
import OrderStatusForm from "./orderStatusForm";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="text-end text-sm font-medium">{value}</span>
  </div>
);

// eslint-disable-next-line max-lines-per-function
const OrderDetails = ({ order }: { order: AdminOrderDetails }) => {
  const payment = order.payments[0];

  return (
    <div
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]"
      data-testid="order-details-dynamic-content"
    >
      <div className="flex min-w-0 flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              سفارش
              <span dir="ltr">#{getShortOrderId(order.id)}</span>
            </CardTitle>
            <CardDescription>
              ثبت‌شده در {formatOrderDate(order.createdAt)}
            </CardDescription>
            <CardAction>
              <OrderStatusBadge status={order.status} />
            </CardAction>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <InfoRow
              label="مبلغ سفارش"
              value={formatOrderCurrency(order.totalPrice)}
            />
            <InfoRow
              label="روش ارسال"
              value={sendingMethodLabels[order.sendingMethod]}
            />
            <InfoRow
              label="درگاه انتخابی"
              value={paymentGatewayLabels[order.paymentGateway]}
            />
            <InfoRow
              label="آخرین به‌روزرسانی"
              value={formatOrderDate(order.updatedAt)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>اقلام سفارش</CardTitle>
            <CardDescription>
              قیمت‌ها مطابق لحظه ثبت سفارش نگه‌داری شده‌اند.
            </CardDescription>
            <CardAction>
              <Badge variant="outline">
                <Package data-icon="inline-start" />
                {order.items.length.toLocaleString("fa-IR")} ردیف
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>محصول</TableHead>
                    <TableHead>تعداد</TableHead>
                    <TableHead>قیمت واحد</TableHead>
                    <TableHead>تخفیف</TableHead>
                    <TableHead>جمع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => {
                    const finalUnitPrice =
                      (item.unitPrice * (100 - item.discount)) / 100;
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Link
                            className="font-medium hover:underline"
                            href={`/admin/products/${item.product.id}`}
                          >
                            {item.product.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {item.quantity.toLocaleString("fa-IR")}
                        </TableCell>
                        <TableCell>
                          {formatOrderCurrency(item.unitPrice)}
                        </TableCell>
                        <TableCell>
                          {item.discount.toLocaleString("fa-IR")}٪
                        </TableCell>
                        <TableCell>
                          {formatOrderCurrency(finalUnitPrice * item.quantity)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>مبلغ نهایی سفارش</TableCell>
                    <TableCell>
                      {formatOrderCurrency(order.totalPrice)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-xs">
              شناسه کامل سفارش: <span dir="ltr">{order.id}</span>
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>مدیریت وضعیت</CardTitle>
            <CardDescription>
              وضعیت جاری را مطابق روند آماده‌سازی سفارش تغییر دهید.
            </CardDescription>
            <CardAction>
              <ShoppingBag className="text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <OrderStatusForm id={order.id} status={order.status} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مشتری</CardTitle>
            <CardDescription>اطلاعات صاحب سفارش</CardDescription>
            <CardAction>
              <UserRound className="text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <InfoRow label="نام" value={order.user.name} />
            <Separator />
            <InfoRow
              label="تلفن"
              value={<span dir="ltr">{order.user.phoneNumber ?? "—"}</span>}
            />
            <Separator />
            <InfoRow
              label="ایمیل"
              value={<span dir="ltr">{order.user.email}</span>}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>نشانی تحویل</CardTitle>
            <CardDescription>اطلاعات گیرنده و مقصد</CardDescription>
            <CardAction>
              <MapPin className="text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <InfoRow label="گیرنده" value={order.address.fullname} />
            <Separator />
            <InfoRow
              label="شماره تماس"
              value={<span dir="ltr">{order.address.phoneNumber}</span>}
            />
            <Separator />
            <InfoRow
              label="مقصد"
              value={`${order.address.province}، ${order.address.city}`}
            />
            <Separator />
            <InfoRow
              label="کد پستی"
              value={<span dir="ltr">{order.address.postCode}</span>}
            />
            <Separator />
            <p className="text-muted-foreground text-sm leading-6">
              {order.address.additionalAddress}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>پرداخت</CardTitle>
            <CardDescription>آخرین اطلاعات ثبت‌شده برای پرداخت</CardDescription>
            <CardAction>
              <CreditCard className="text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {payment ? (
              <>
                <InfoRow
                  label="مبلغ"
                  value={formatOrderCurrency(payment.amount)}
                />
                <Separator />
                <InfoRow
                  label="درگاه"
                  value={
                    payment.gateway
                      ? paymentGatewayLabels[payment.gateway]
                      : "نامشخص"
                  }
                />
                <Separator />
                <InfoRow
                  label="تاریخ"
                  value={formatOrderDate(payment.createdAt)}
                />
                <Separator />
                <InfoRow
                  label="شناسه پرداخت"
                  value={<span dir="ltr">{payment.id}</span>}
                />
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                پرداخت موفقی برای این سفارش ثبت نشده است.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
