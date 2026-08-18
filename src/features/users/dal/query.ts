import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as userService from "@/services/users/user.service";

export const getUsersList = async () =>
  dalVerifySuccess(
    await dalRequireAuth(() => dalDbOperation(userService.getAllUsers), {
      user: ["get"],
    }),
  );
