import type { FileMeta } from "../media/type";
import type { Product } from "../product/type";

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

export interface FullOrder {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: "cancelled" | "delivered" | "paid" | "paying" | "pending";
  addressId: string;
  paymentGateway: PaymentGateway;
  totalPrice: number;
  sendingMethod: SendingMethod;
  address: {
    id: string;
    fullname: string;
    phoneNumber: string;
    postCode: string;
    province: string;
    city: string;
    additionalAddress: string;
    createdAt: Date;
    userId: string;
  };
  items: {
    id: string;
    createdAt: Date;
    productId: string;
    discount: number;
    metadataId: string;
    quantity: number;
    orderId: string;
    unitPrice: number;
    metadata: Product["metadata"][number];
    product: {
      id: string;
      name: string;
      slug: string;
      thumbnail: {
        type: "audio" | "document" | "image" | "video";
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        size: number;
        meta: FileMeta;
      } | null;
    };
  }[];
}
