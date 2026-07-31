import {
  integer,
  jsonb,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import type { PaymentGateway } from "@/services/shipping/type";

import { user } from "./auth";
import { CurrencyEnum, MainSchema } from "./main";
import { order } from "./order";

export const payment = MainSchema.table("payment", {
  id: uuid("id").defaultRandom().primaryKey(),
  amount: integer("price").notNull(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  currency: CurrencyEnum("currency").default("IRR").notNull(),
  gateway: varchar("gateway", { length: 50 }).$type<PaymentGateway>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  transaction: jsonb("transaction"),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
});
