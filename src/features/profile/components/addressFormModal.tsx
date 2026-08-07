import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import Dialog from "@/components/ui/dialog";

import type { CustomerProfileAddress } from "../types";

import {
  createProfileAddressAction,
  updateProfileAddressAction,
} from "../actions/address";
import {
  setEditingAddress,
  setShowNewAddress,
  useAddressStore,
} from "../store/address";

type FormErrors = Partial<
  Record<
    | "additionalAddress"
    | "city"
    | "fullname"
    | "phoneNumber"
    | "postCode"
    | "province",
    string[]
  >
>;

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-primary-300 bg-primary-25 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-primary-600/60 focus:border-secondary-500 focus:bg-white focus:ring-4 focus:ring-secondary-500/10";

const AddressField = ({
  error,
  label,
  ...props
}: React.ComponentProps<"input"> & { label: string; error?: string[] }) => (
  <label className="block text-sm font-bold text-gray-700">
    {label}
    <input {...props} className={fieldClassName} />
    {error?.[0] && (
      <span className="mt-1.5 block text-xs font-medium text-error">
        {error[0]}
      </span>
    )}
  </label>
);

const AddressModalHeader = () => (
  <div className="mb-6 flex items-start justify-between gap-4">
    <p className="mt-1 text-sm leading-6 text-primary-900">
      اطلاعات دقیق، تحویل سفارش را سریع‌تر می‌کند.
    </p>
  </div>
);

const AddressFormActions = ({
  isPending,
  onClose,
}: {
  isPending: boolean;
  onClose: () => void;
}) => (
  <div className="flex flex-col-reverse gap-3 border-t border-primary-200 pt-5 sm:flex-row sm:justify-end">
    <button
      className="rounded-full border border-primary-300 px-6 py-3 text-sm font-bold text-primary-900 transition hover:bg-primary-200"
      disabled={isPending}
      onClick={onClose}
      type="button"
    >
      انصراف
    </button>
    <button
      className="center gap-2 rounded-full bg-secondary-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-secondary-500/20 transition hover:bg-secondary-600 disabled:cursor-wait disabled:opacity-60"
      disabled={isPending}
      type="submit"
    >
      <Check className="size-4" />
      {isPending ? "در حال ذخیره..." : "ذخیره نشانی"}
    </button>
  </div>
);

const AddressFormModal = ({
  addresses,
}: {
  addresses: CustomerProfileAddress[];
}) => {
  const { showNewAddress, editingAddressId } = useAddressStore();
  const router = useRouter();
  const address = addresses.find((a) => a.id === editingAddressId);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({});
  const isEditing = Boolean(showNewAddress || editingAddressId);

  const onClose = () => {
    setEditingAddress(undefined);
    setShowNewAddress(false);
  };
  // useEffect(() => {
  //   const closeOnEscape = (event: KeyboardEvent) => {
  //     if (event.key === "Escape" && !isPending) onClose();
  //   };

  //   document.addEventListener("keydown", closeOnEscape);
  //   return () => document.removeEventListener("keydown", closeOnEscape);
  // }, [isPending, onClose]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input = {
      ...(address ? { id: address.id } : {}),
      fullname: String(formData.get("fullname") ?? ""),
      phoneNumber: String(formData.get("phoneNumber") ?? ""),
      postCode: String(formData.get("postCode") ?? ""),
      province: String(formData.get("province") ?? ""),
      city: String(formData.get("city") ?? ""),
      additionalAddress: String(formData.get("additionalAddress") ?? ""),
    };

    startTransition(async () => {
      const result = address
        ? await updateProfileAddressAction(input)
        : await createProfileAddressAction(input);

      if (!result.success) {
        setErrors((result.errors ?? {}) as FormErrors);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
      onClose();
    });
  };

  return (
    <Dialog
      isOpen={isEditing}
      onClose={onClose}
      title={isEditing ? "ویرایش نشانی" : "نشانی جدید"}
    >
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-4xl border border-white bg-white p-5 shadow-2xl sm:rounded-4xl sm:p-7">
        <AddressModalHeader />

        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <AddressField
              autoComplete="name"
              defaultValue={address?.fullname}
              error={errors.fullname}
              label="نام تحویل‌گیرنده"
              name="fullname"
              placeholder="مثلاً سارا محمدی"
            />
            <AddressField
              autoComplete="tel"
              defaultValue={address?.phoneNumber}
              dir="ltr"
              error={errors.phoneNumber}
              inputMode="tel"
              label="شماره موبایل"
              name="phoneNumber"
              placeholder="09123456789"
            />
            <AddressField
              defaultValue={address?.province}
              error={errors.province}
              label="استان"
              name="province"
              placeholder="تهران"
            />
            <AddressField
              defaultValue={address?.city}
              error={errors.city}
              label="شهر"
              name="city"
              placeholder="تهران"
            />
          </div>
          <label className="block text-sm font-bold text-gray-700">
            نشانی کامل
            <textarea
              className={`${fieldClassName} min-h-28 resize-none leading-7`}
              defaultValue={address?.additionalAddress}
              name="additionalAddress"
              placeholder="خیابان، کوچه، پلاک و واحد"
            />
            {errors.additionalAddress?.[0] && (
              <span className="mt-1.5 block text-xs font-medium text-error">
                {errors.additionalAddress[0]}
              </span>
            )}
          </label>
          <AddressField
            autoComplete="postal-code"
            defaultValue={address?.postCode}
            dir="ltr"
            error={errors.postCode}
            inputMode="numeric"
            label="کد پستی"
            maxLength={10}
            name="postCode"
            placeholder="1234567890"
          />

          <AddressFormActions isPending={isPending} onClose={onClose} />
        </form>
      </div>
    </Dialog>
  );
};

export default AddressFormModal;
