export interface Address {
  id: string;
  fullname: string;
  phoneNumber: string;
  postCode: string;
  province: string;
  city: string;
  additionalAddress: string;
  createdAt: Date;
}

export interface CreateAddress {
  fullname: string;
  phoneNumber: string;
  postCode: string;
  province: string;
  city: string;
  additionalAddress: string;
  userId: string;
}

export const orderStatuses = [
  "pending",
  "paying",
  "paid",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export type SendingMethod = "personReception" | "storeSend";
export type PaymentGateway = "saman" | "zarinpal";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  metadataId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  addressId: string;
  status: OrderStatus;
  totalPrice: number;
  sendingMethod: SendingMethod;
  paymentGateway: PaymentGateway;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrder {
  addressId: string;
  sendingMethod: SendingMethod;
  paymentGateway: PaymentGateway;
  userId: string;
}
