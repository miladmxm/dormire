import { Check } from "lucide-react";
import { FormProvider } from "react-hook-form";

import Dialog from "@/components/ui/dialog";

import type { EditOrCreateAddress } from "../hooks/useEditOrCreateAddress";
import type { CustomerProfileAddress } from "../types";

import { useEditOrCreateAddress } from "../hooks/useEditOrCreateAddress";
import { closeAddressModal, useAddressStore } from "../store/address";
import {
  AddressAdditionalField,
  AddressCityField,
  AddressNameField,
  AddressPhoneNumberField,
  AddressPostCodeField,
  AddressProvinceField,
} from "./addressFormFields";

const AddressModalHeader = () => (
  <div className="mb-6 flex items-start justify-between gap-4">
    <p className="mt-1 text-sm leading-6 text-primary-900">
      اطلاعات دقیق، تحویل سفارش را سریع‌تر می‌کند.
    </p>
  </div>
);

const AddressFormActions = ({ isPending }: { isPending: boolean }) => (
  <div className="flex flex-col-reverse gap-3 border-t border-primary-200 pt-5 sm:flex-row sm:justify-end">
    <button
      className="rounded-full border border-primary-300 px-6 py-3 text-sm font-bold text-primary-900 transition hover:bg-primary-200"
      disabled={isPending}
      onClick={closeAddressModal}
      type="button"
    >
      انصراف
    </button>
    <button
      className="center gap-2 rounded-full bg-secondary-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-secondary-500/20 transition hover:bg-secondary-600 disabled:cursor-wait disabled:opacity-60"
      disabled={isPending}
      type="submit"
    >
      {isPending ? "در حال ذخیره..." : "ذخیره نشانی"}
      <Check className="size-4" />
    </button>
  </div>
);

const AddressForm = (props: EditOrCreateAddress) => {
  const { onSubmit, form, isPending } = useEditOrCreateAddress(props);
  return (
    <FormProvider {...form}>
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AddressNameField />
          <AddressPhoneNumberField />
          <AddressProvinceField />
          <AddressCityField />
        </div>
        <AddressAdditionalField />
        <AddressPostCodeField />
        <AddressFormActions isPending={isPending} />
      </form>
    </FormProvider>
  );
};

const AddressFormModal = ({
  addresses,
}: {
  addresses: CustomerProfileAddress[];
}) => {
  const { editingAddressId, showNewAddress } = useAddressStore();
  const isEditing = Boolean(editingAddressId);
  const isCreating = showNewAddress && !isEditing;

  const address = addresses.find((a) => a.id === editingAddressId);

  const isOpen = isEditing || isCreating;

  if (isEditing && !address) return;
  return (
    <Dialog
      isOpen={isOpen}
      onClose={closeAddressModal}
      title={isEditing ? "ویرایش نشانی" : "نشانی جدید"}
    >
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-4xl border border-white bg-white p-5 shadow-2xl sm:rounded-4xl sm:p-7">
        <AddressModalHeader />
        <AddressForm address={address} isEditing={isEditing} />
      </div>
    </Dialog>
  );
};

export default AddressFormModal;
