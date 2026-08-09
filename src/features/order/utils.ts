export const formatOrderCurrency = (value: number) =>
  `${new Intl.NumberFormat("fa-IR").format(Math.round(value / 10))} تومان`;

export const formatOrderDate = (value: Date) =>
  new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);

export const getShortOrderId = (id: string) => id.slice(0, 8).toUpperCase();
