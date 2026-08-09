import { notFound } from "next/navigation";
import * as v from "valibot";

import OrderDetails from "../components/orderDetails";
import { getAdminOrder } from "../dal/query";
import { OrderIdSchema } from "../validations";

const OrderDetailsContainer = async ({
  params,
}: {
  params: PageProps<"/admin/orders/[id]">["params"];
}) => {
  const { id } = await params;
  const parsedId = v.safeParse(OrderIdSchema, id);

  if (!parsedId.success) notFound();

  const order = await getAdminOrder(parsedId.output);

  if (!order) notFound();

  return <OrderDetails order={order} />;
};

export default OrderDetailsContainer;
