import type { OrderStatus } from "@/services/shipping/type";

import { Badge } from "@/components/dashboard/ui/badge";

import { orderStatusDetails } from "../constants";

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const { icon: Icon, label, variant } = orderStatusDetails[status];

  return (
    <Badge variant={variant}>
      <Icon data-icon="inline-start" />
      {label}
    </Badge>
  );
};

export default OrderStatusBadge;
