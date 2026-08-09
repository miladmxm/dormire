import { createAccessControl } from "better-auth/plugins/access";

export const statements = {
  customer: ["create", "read", "update", "delete", "ban"],
  product: ["create", "read", "update", "delete"],
  portfolio: ["create", "read", "update", "delete"],
  blog: ["create", "read", "update", "delete"],
  comment: ["create", "read", "update", "delete", "spam"],
  settings: ["read", "update"],
  media: ["read", "upload", "delete", "update"],
  cart: ["read", "add", "update", "delete"],
  address: ["create", "read", "update", "delete"],
  order: ["create", "read", "update"],
  profile: ["read", "write"],
} as const;

export type KeyStatements = keyof typeof statements;
export type Permissions = {
  [K in KeyStatements]: (typeof statements)[K][number][];
};
export const ac = createAccessControl(statements);

export const roles = {
  customer: ac.newRole({
    product: ["read"],
    blog: ["read"],
    comment: ["read", "create"],
    media: ["read"],
    portfolio: ["read"],
    cart: ["read", "add", "update", "delete"],
    address: ["create", "read", "update", "delete"],
    order: ["create", "read"],
    profile: ["read", "write"],
  }),

  moderator: ac.newRole({
    customer: ["read"],
    product: ["read", "create", "update", "delete"],
    blog: ["read", "create", "update", "delete"],
    settings: ["read"],
    comment: ["spam", "delete", "read", "update", "create"],
    media: ["read", "upload", "update"],
    portfolio: ["read", "update", "delete", "create"],
    cart: ["read", "add", "update", "delete"],
    address: ["create", "read", "update", "delete"],
    order: ["create", "read", "update"],
    profile: ["read", "write"],
  }),

  admin: ac.newRole({
    blog: ["create", "read", "update", "delete"],
    product: ["create", "read", "update", "delete"],
    customer: ["create", "read", "update", "delete", "ban"],
    comment: ["create", "read", "update", "delete", "spam"],
    settings: ["read", "update"],
    media: ["delete", "read", "upload", "update"],
    portfolio: ["read", "update", "delete", "create"],
    cart: ["read", "add", "update", "delete"],
    address: ["create", "read", "update", "delete"],
    order: ["create", "read", "update"],
    profile: ["read", "write"],
  }),
};
