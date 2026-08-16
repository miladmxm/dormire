import type { LimitAndOffset } from "@/services/type";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as commentService from "@/services/comment";

export const getComments = async (options?: LimitAndOffset) => {
  return dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => commentService.getAllComments(options)),
      {
        comment: ["public-read"],
      },
    ),
  );
};
