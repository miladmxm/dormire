import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import { phoneNumber } from "better-auth/plugins/phone-number";
import { headers } from "next/headers";

import env from "@/config/env";
import { db } from "@/db/drizzle/db";
import { createFakeFrutiAndColorName } from "@/utils/faker";

import type { Permissions } from "./permisions";

import { ac, roles } from "./permisions";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    changeEmail: { enabled: true },
    deleteUser: {
      enabled: true,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ token, url, user }) => {
      console.log(user, token, url);
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
      allowedAttempts: 3,
      expiresIn: 2 * 60,
      phoneNumberValidator: (pn) => /^\+989\d{9}$/.test(pn),
      requireVerification: true,
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
