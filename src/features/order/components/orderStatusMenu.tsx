"use client";

import { ChevronDown } from "lucide-react";

import type { OrderStatus } from "@/services/shipping/type";

import { Button } from "@/components/dashboard/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { useDirection } from "@/hooks/useDirection";
import { orderStatuses } from "@/services/shipping/type";

import { orderStatusDetails } from "../constants";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";

const OrderStatusMenu = ({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) => {
  const dir = useDirection();
  const { isPending, updateStatus, value } = useUpdateOrderStatus(id, status);

  return (
    <DropdownMenu dir={dir}>
      <DropdownMenuTrigger asChild>
        <Button disabled={isPending} size="sm" variant="outline">
          {isPending ? (
            <Spinner data-icon="inline-start" />
          ) : (
            orderStatusDetails[value].label
          )}
          <ChevronDown data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>تغییر وضعیت سفارش</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(nextValue) => updateStatus(nextValue as OrderStatus)}
        >
          {orderStatuses.map((orderStatus) => (
            <DropdownMenuRadioItem key={orderStatus} value={orderStatus}>
              {orderStatusDetails[orderStatus].label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderStatusMenu;
