import { cacheTag } from "next/cache";
import "server-only";

import { CacheKeys } from "@/constant/cacheKeys";
import * as userRepo from "@/repositories/user.repo";

export const getPhoneAuthMethod = async (phoneNumber: string) => {
  const existingUser = await userRepo.findUserByPhoneNumber(phoneNumber);

  if (!existingUser) return "registration" as const;

  const credentialAccount = await userRepo.findCredentialAccountByUserId(
    existingUser.id,
  );

  return credentialAccount ? ("password" as const) : ("registration" as const);
};

export const userHasPassword = async (userId: string) => {
  "use cache";

  cacheTag(`${CacheKeys.userAccount}-${userId}`);

  return Boolean(await userRepo.findCredentialAccountByUserId(userId));
};
