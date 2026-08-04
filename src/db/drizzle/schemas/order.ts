import { integer, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import type { PaymentGateway, SendingMethod } from "@/services/shipping/type";

import { orderStatuses } from "@/services/shipping/type";

import { address } from "./address";
import { user } from "./auth";
import { MainSchema } from "./main";
import { product, productMeta } from "./product";

export const orderStatusEnum = MainSchema.enum("order_status", orderStatuses);

export const order = MainSchema.table("order", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  addressId: uuid("address_id")
    .notNull()
    .references(() => address.id, { onDelete: "cascade" }),
  status: orderStatusEnum("status").notNull().default("pending"),
  paymentGateway: varchar("payment_gateway", {
    length: 50,
  })
    .$type<PaymentGateway>()
    .notNull(),
  totalPrice: integer("total_price").notNull().default(0),
  sendingMethod: varchar("sending_method", { length: 50 })
    .$type<SendingMethod>()
    .default("storeSend")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const orderItem = MainSchema.table("order_item", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  metadataId: uuid("metadata_id")
    .notNull()
    .references(() => productMeta.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: integer("unit_price").notNull().default(0),
  discount: integer("discount").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
