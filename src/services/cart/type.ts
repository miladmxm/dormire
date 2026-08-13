import type { Media } from "../media/type";
import type { Product } from "../product/type";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  metadataId: string;
  quantity: number;
  createdAt: Date;
  product: {
    id: string;
    name: string;
    slug: string;
    type: Product["type"];
    thumbnail?: Media | null;
    variables?: Product["variables"] | null;
  };
  metadata: Product["metadata"][number];
}

export interface Cart {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[];
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  userId: string;
  metadataId: string;
}
export interface UpdateCartItemPayload {
  userId: string;
  itemId: string;
  quantity: number;
}
