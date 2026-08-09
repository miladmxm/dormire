import "server-only";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as profileService from "@/services/profile/profile.service";

export const setUserPasswordIfNotHave = async (password: string) =>
  dalRequireAuth(
    ({ id }) =>
      dalDbOperation(() =>
        profileService.setUserPasswordIfNotHave({ userId: id, password }),
      ),
    { profile: ["write"] },
  );
