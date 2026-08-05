"use client";

import { Check, MapPin, PencilLine, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import type { CustomerProfileAddress } from "../types";

import {
  createProfileAddressAction,
  deleteProfileAddressAction,
  updateProfileAddressAction,
} from "../actions/address";

interface AddressManagerProps {
  addresses: CustomerProfileAddress[];
}

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

const AddressModalHeader = ({
  isEditing,
  isPending,
  onClose,
}: {
  isEditing: boolean;
  isPending: boolean;
  onClose: () => void;
}) => (
  <div className="mb-6 flex items-start justify-between gap-4">
    <div>
      <h3
        className="text-xl font-black text-gray-900"
        id="address-dialog-title"
      >
        {isEditing ? "ویرایش نشانی" : "نشانی جدید"}
      </h3>
      <p className="mt-1 text-sm leading-6 text-primary-900">
        اطلاعات دقیق، تحویل سفارش را سریع‌تر می‌کند.
      </p>
    </div>
    <button
      aria-label="بستن"
      className="center size-10 shrink-0 rounded-full border border-primary-300 text-primary-900 transition hover:bg-primary-200"
      disabled={isPending}
      onClick={onClose}
      type="button"
    >
      <X className="size-5" />
    </button>
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
  address,
  onClose,
}: {
  address?: CustomerProfileAddress;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({});
  const isEditing = Boolean(address);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) onClose();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isPending, onClose]);

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
    <div
      aria-labelledby="address-dialog-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/30 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      role="dialog"
    >
      <button
        aria-label="بستن پنجره"
        className="absolute inset-0 cursor-default"
        disabled={isPending}
        onClick={onClose}
        type="button"
      />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-4xl border border-white bg-white p-5 shadow-2xl sm:rounded-4xl sm:p-7">
        <AddressModalHeader
          isEditing={isEditing}
          isPending={isPending}
          onClose={onClose}
        />

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
    </div>
  );
};

const AddressSectionHeader = ({ onAdd }: { onAdd: () => void }) => (
  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div>
      <h2 className="text-2xl font-black text-gray-900" id="addresses-heading">
        نشانی‌های من
      </h2>
      <p className="mt-1 text-sm leading-6 text-primary-900">
        نشانی‌های آماده، مرحله پرداخت را کوتاه‌تر می‌کنند.
      </p>
    </div>
    <button
      className="center w-fit gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-secondary-800"
      onClick={onAdd}
      type="button"
    >
      <Plus className="size-4" />
      افزودن نشانی
    </button>
  </div>
);

const AddressManager = ({ addresses }: AddressManagerProps) => {
  const router = useRouter();
  const [editingAddress, setEditingAddress] =
    useState<CustomerProfileAddress>();
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [deletingId, setDeletingId] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const deleteAddress = (address: CustomerProfileAddress) => {
    startTransition(async () => {
      const result = await deleteProfileAddressAction({ id: address.id });
      setDeletingId(undefined);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    });
  };

  return (
    <section aria-labelledby="addresses-heading">
      <AddressSectionHeader onAdd={() => setShowNewAddress(true)} />

      {addresses.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-4xl border border-dashed border-primary-500 bg-primary-50/70 p-7 text-center">
          <div className="center mb-5 size-16 rounded-3xl bg-thready-500 text-thready-900">
            <MapPin className="size-7" />
          </div>
          <h3 className="text-lg font-black text-gray-900">
            هنوز نشانی ندارید
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-7 text-primary-900">
            اولین نشانی تحویل را ثبت کنید تا خرید بعدی سریع‌تر انجام شود.
          </p>
          <button
            className="mt-5 rounded-full border border-gray-900 px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            onClick={() => setShowNewAddress(true)}
            type="button"
          >
            ثبت اولین نشانی
          </button>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {addresses.map((address, index) => (
            <article
              className="group rounded-4xl border border-primary-300 bg-white p-5 transition hover:-translate-y-0.5 hover:border-thready-800/40 hover:shadow-blur-sm"
              key={address.id}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="center size-10 rounded-2xl bg-thready-200 text-thready-900">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-black text-gray-900">
                      {address.province}، {address.city}
                    </h3>
                    {index === 0 && (
                      <span className="text-xs font-bold text-secondary-600">
                        آخرین نشانی ثبت‌شده
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    aria-label={`ویرایش نشانی ${address.city}`}
                    className="center size-9 rounded-full text-primary-900 transition hover:bg-primary-200 hover:text-gray-900"
                    onClick={() => setEditingAddress(address)}
                    type="button"
                  >
                    <PencilLine className="size-4" />
                  </button>
                  <button
                    aria-label={`حذف نشانی ${address.city}`}
                    className="center size-9 rounded-full text-primary-900 transition hover:bg-red-50 hover:text-error disabled:opacity-40"
                    disabled={isPending && deletingId === address.id}
                    onClick={() => setDeletingId(address.id)}
                    type="button"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <p className="min-h-14 text-sm leading-7 text-primary-900">
                {address.additionalAddress}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-primary-200 pt-4 text-xs text-primary-900">
                <span>{address.fullname}</span>
                <span dir="ltr">{address.phoneNumber}</span>
                <span dir="ltr">کد پستی: {address.postCode}</span>
              </div>
              {deletingId === address.id && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-red-50 px-4 py-3 text-xs text-red-700">
                  <span>این نشانی حذف شود؟</span>
                  <div className="flex gap-2">
                    <button
                      className="rounded-full bg-error px-4 py-1.5 font-bold text-white disabled:opacity-50"
                      disabled={isPending}
                      onClick={() => deleteAddress(address)}
                      type="button"
                    >
                      {isPending ? "در حال حذف..." : "بله، حذف شود"}
                    </button>
                    <button
                      className="rounded-full border border-red-200 px-4 py-1.5 font-bold"
                      disabled={isPending}
                      onClick={() => setDeletingId(undefined)}
                      type="button"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {(showNewAddress || editingAddress) && (
        <AddressFormModal
          address={editingAddress}
          onClose={() => {
            setShowNewAddress(false);
            setEditingAddress(undefined);
          }}
        />
      )}
    </section>
  );
};

export default AddressManager;
