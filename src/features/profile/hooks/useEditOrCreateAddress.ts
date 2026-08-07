import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CustomerProfileAddress } from "../types";
import type { NewProfileAddressInput } from "../validations/address";

import {
  createProfileAddressAction,
  updateProfileAddressAction,
} from "../actions/address";
import { closeAddressModal } from "../store/address";
import {
  NewProfileAddressSchema,
  ProfileAddressSchema,
} from "../validations/address";

const defaultInputs: NewProfileAddressInput = {
  additionalAddress: "",
  city: "",
  fullname: "",
  phoneNumber: "",
  postCode: "",
  province: "",
};

export interface EditOrCreateAddress {
  isEditing: boolean;
  address?: CustomerProfileAddress;
}

export const useEditOrCreateAddress = ({
  address,
  isEditing,
}: EditOrCreateAddress) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: valibotResolver(
      isEditing ? ProfileAddressSchema : NewProfileAddressSchema,
    ),
    defaultValues: isEditing ? address : defaultInputs,
  });

  const onSubmit = form.handleSubmit((input) => {
    startTransition(async () => {
      const result = address
        ? await updateProfileAddressAction(input)
        : await createProfileAddressAction(input);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
      closeAddressModal();
    });
  });

  return {
    onSubmit,
    form,
    isPending,
  };
};
