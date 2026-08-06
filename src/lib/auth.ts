import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin, phoneNumber } from "better-auth/plugins";
import { headers } from "next/headers";

import env from "@/config/env";
import { db } from "@/db/drizzle/db";
import { createFakeFrutiAndColorName } from "@/utils/faker";

import type { Permissions } from "./permisions";

import { ac, roles } from "./permisions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  session: {
    disableSessionRefresh: true,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 256,
  },
  onAPIError: {
    throw: true,
  },
  plugins: [
    phoneNumber({
      sendOTP: ({ phoneNumber: pn, code }) => {
        console.log(pn, code);
      },
      signUpOnVerification: {
        getTempEmail: (pn) => {
          return `${pn}@${env.ORIGIN_DOMAIN}`;
        },

        getTempName: () => {
          return createFakeFrutiAndColorName();
        },
      },
    }),
    admin({
      ac,
      roles,
      defaultRole: "customer",
      adminRoles: ["admin"],
    }),
    nextCookies(),
  ],
});

export const getSession = async () =>
  auth.api.getSession({ headers: await headers() });

export const hasAccess = async (
  userId: (typeof auth.$Infer)["Session"]["user"]["id"],
  permissions: Partial<Permissions>,
) => {
  return await auth.api.userHasPermission({
    body: {
      userId,
      permissions,
    },
  });
};
