import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";

import { NewPasswordSchema } from "../validations/profile";

export const useSetPassword = () => {
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(NewPasswordSchema),
    defaultValues: { confirmNewPassword: "", newPassword: "" },
  });
  const onSubmit = handleSubmit(({ confirmNewPassword, newPassword }) => {
    console.log(confirmNewPassword, newPassword);
  });
  return { onSubmit, control };
};
