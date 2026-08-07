import type { LucideIcon } from "lucide-react";

import type { OrderStatus } from "@/services/shipping/type";

export interface CustomerProfileAddress {
  id: string;
  fullname: string;
  phoneNumber: string;
  postCode: string;
  province: string;
  city: string;
  additionalAddress: string;
  createdAt: string;
}

export interface CustomerProfileOrderItem {
  id: string;
  quantity: number;
  product: {
    name: string;
    slug: string;
  };
}

export interface CustomerProfileOrder {
  id: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  items: CustomerProfileOrderItem[];
}

export interface CustomerProfileData {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string | null;
    phoneNumberVerified: boolean;
    image: string | null;
    createdAt: string;
  };
  addresses: CustomerProfileAddress[];
  orders: CustomerProfileOrder[];
  cartItemCount: number;
}
export type ProfileTab =
  | "account"
  | "addresses"
  | "orders"
  | "overview"
  | "security";

export interface TabItem {
  id: ProfileTab;
  label: string;
  icon: LucideIcon;
}

export interface AddressManagerProps {
  addresses: CustomerProfileAddress[];
}
