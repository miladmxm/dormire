"use client";

import { useState } from "react";

import type { OrderStatus } from "@/services/shipping/type";

import { Button } from "@/components/dashboard/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/dashboard/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/ui/select";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { orderStatuses } from "@/services/shipping/type";

import { orderStatusDetails } from "../constants";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";

const OrderStatusForm = ({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) => {
  const { isPending, updateStatus, value } = useUpdateOrderStatus(id, status);
  const [selectedStatus, setSelectedStatus] = useState(value);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        updateStatus(selectedStatus);
      }}
    >
      <FieldGroup>
        <Field data-disabled={isPending || selectedStatus === value}>
          <FieldLabel htmlFor="order-status">وضعیت سفارش</FieldLabel>
          <Select
            disabled={isPending}
            value={selectedStatus}
            onValueChange={(nextValue) =>
              setSelectedStatus(nextValue as OrderStatus)
            }
          >
            <SelectTrigger className="w-full" id="order-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                {orderStatuses.map((orderStatus) => (
                  <SelectItem key={orderStatus} value={orderStatus}>
                    {orderStatusDetails[orderStatus].label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription>
            {orderStatusDetails[selectedStatus].description}
          </FieldDescription>
        </Field>
        <Button disabled={isPending || selectedStatus === value} type="submit">
          {isPending && <Spinner data-icon="inline-start" />}
          ثبت وضعیت جدید
        </Button>
      </FieldGroup>
    </form>
  );
};

export default OrderStatusForm;
