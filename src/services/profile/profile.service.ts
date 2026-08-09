import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { auth } from "@/lib/auth";
import * as userRepo from "@/repositories/user.repo";

export const userHavePassword = async (userId: string) => {
  "use cache";

  cacheTag(`${CacheKeys.userAcount}-${userId}`);

  const userAcount = await userRepo.findAcountByUserId(userId);
  if (!userAcount || !userAcount.password) return false;
  return true;
};

export const setUserPasswordIfNotHave = async ({
  password,
  userId,
}: {
  userId: string;
  password: string;
}) => {
  if (await userHavePassword(userId)) return false;
  const { status } = await auth.api.setUserPassword({
    body: { userId, newPassword: password },
  });
  return status;
};
