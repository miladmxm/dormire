import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const statements = {
  ...defaultStatements,
  customer: ["create", "read", "update", "delete", "ban"],
  product: ["create", "read", "public-read", "update", "delete"],
  portfolio: ["create", "read", "public-read", "update", "delete"],
  blog: ["create", "read", "public-read", "update", "delete"],
  comment: [
    "create",
    "read",
    "public-read",
    "public-create",
    "update",
    "delete",
    "spam",
  ],
  settings: ["read", "update"],
  media: ["read", "public-read", "upload", "delete", "update"],
  cart: [
    "read",
    "add",
    "update",
    "delete",
    "public-read",
    "public-add",
    "public-update",
    "public-delete",
  ],
  address: [
    "create",
    "read",
    "update",
    "delete",
    "public-create",
    "public-read",
    "public-update",
    "public-delete",
  ],
  order: ["create", "read", "public-create", "public-read", "update"],
  profile: ["public-read", "public-write", "read", "write"],
} as const;

export type KeyStatements = keyof typeof statements;
export type Permissions = {
  [K in KeyStatements]: (typeof statements)[K][number][];
};
export const ac = createAccessControl(statements);

export const roles = {
  customer: ac.newRole({
    product: ["public-read"],
    blog: ["public-read"],
    comment: ["public-read", "public-create"],
    media: ["public-read"],
    portfolio: ["public-read"],
    cart: ["public-read", "public-add", "public-update", "public-delete"],
    address: ["public-create", "public-read", "public-update", "public-delete"],
    order: ["public-create", "public-read"],
    profile: ["public-read", "public-write"],
  }),

  moderator: ac.newRole({
    customer: ["read"],
    product: ["read", "create", "update", "delete", "public-read"],
    blog: ["read", "create", "update", "delete", "public-read"],
    settings: ["read"],
    comment: [
      "spam",
      "delete",
      "read",
      "update",
      "create",
      "public-read",
      "public-create",
    ],
    media: ["read", "upload", "update", "public-read"],
    portfolio: ["read", "update", "delete", "create", "public-read"],
    cart: [
      "read",
      "add",
      "update",
      "delete",
      "public-read",
      "public-add",
      "public-update",
      "public-delete",
    ],
    address: [
      "create",
      "read",
      "update",
      "delete",
      "public-create",
      "public-read",
      "public-update",
      "public-delete",
    ],
    order: ["create", "read", "update", "public-read", "public-create"],
    profile: ["read", "write", "public-read", "public-write"],
  }),

  admin: ac.newRole({
    ...adminAc.statements,
    blog: ["create", "read", "update", "delete", "public-read"],
    product: ["create", "read", "update", "delete", "public-read"],
    customer: ["create", "read", "update", "delete", "ban"],
    comment: [
      "create",
      "read",
      "update",
      "delete",
      "spam",
      "public-read",
      "public-create",
    ],
    settings: ["read", "update"],
    media: ["delete", "read", "upload", "update", "public-read"],
    portfolio: ["read", "update", "delete", "create", "public-read"],
    cart: [
      "read",
      "add",
      "update",
      "delete",
      "public-read",
      "public-add",
      "public-update",
      "public-delete",
    ],
    address: [
      "create",
      "read",
      "update",
      "delete",
      "public-create",
      "public-read",
      "public-update",
      "public-delete",
    ],
    order: ["create", "read", "update", "public-read", "public-create"],
    profile: ["read", "write", "public-read", "public-write"],
  }),
};
