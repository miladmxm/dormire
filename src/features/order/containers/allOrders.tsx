import { ShoppingBag } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/dashboard/ui/empty";

import OrderStats from "../components/orderStats";
import OrderTable from "../components/table";
import { getAdminOrders } from "../dal/query";

const AllOrders = async () => {
  const orders = await getAdminOrders();

  return (
    <div className="flex flex-col gap-6" data-testid="orders-dynamic-content">
      <OrderStats orders={orders} />
      {orders.length ? (
        <OrderTable data={orders} />
      ) : (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingBag />
            </EmptyMedia>
            <EmptyTitle>هنوز سفارشی ثبت نشده است</EmptyTitle>
            <EmptyDescription>
              پس از ثبت اولین خرید، اطلاعات سفارش در این بخش نمایش داده می‌شود.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
};

export default AllOrders;
