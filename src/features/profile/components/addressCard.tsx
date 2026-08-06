import { MapPin, PencilLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import type { CustomerProfileAddress } from "../types";

import { deleteProfileAddressAction } from "../actions/address";

const AddressCard = ({
  city,
  province,
  onEdit,
  index,
  additionalAddress,
  fullname,
  phoneNumber,
  postCode,
  id,
}: CustomerProfileAddress & { index: number; onEdit: () => void }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const deleteAddress = () => {
    startTransition(async () => {
      const result = await deleteProfileAddressAction({ id });
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
    <article className="h-fit">
      <div className="group rounded-4xl border border-primary-300 bg-white p-5 transition hover:-translate-y-0.5 hover:border-thready-800/40 hover:shadow-blur-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="center size-10 rounded-2xl bg-thready-200 text-thready-900">
              <MapPin className="size-5" />
            </span>
            <div>
              <h3 className="font-black text-gray-900">
                {province}، {city}
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
              aria-label={`ویرایش نشانی ${city}`}
              className="center size-9 rounded-full text-primary-900 transition hover:bg-primary-200 hover:text-gray-900"
              onClick={onEdit}
              type="button"
            >
              <PencilLine className="size-4" />
            </button>
            <button
              aria-label={`حذف نشانی ${city}`}
              className="center size-9 rounded-full text-primary-900 transition hover:bg-red-50 hover:text-error disabled:opacity-40"
              disabled={isPending && deletingId === id}
              onClick={() => setDeletingId(id)}
              type="button"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
        <p className="min-h-14 text-sm leading-7 text-primary-900">
          {additionalAddress}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-primary-200 pt-4 text-xs text-primary-900">
          <span>{fullname}</span>
          <span dir="ltr">{phoneNumber}</span>
          <span dir="ltr">کد پستی: {postCode}</span>
        </div>
        {deletingId === id && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-red-50 px-4 py-3 text-xs text-error">
            <span>این نشانی حذف شود؟</span>
            <div className="flex gap-2">
              <button
                className="rounded-full bg-error px-4 py-1.5 font-bold text-white disabled:opacity-50"
                disabled={isPending}
                onClick={() => deleteAddress()}
                type="button"
              >
                {isPending ? "در حال حذف..." : "بله، حذف شود"}
              </button>
              <button
                className="rounded-full border border-error/30 px-4 py-1.5 font-bold"
                disabled={isPending}
                onClick={() => setDeletingId(undefined)}
                type="button"
              >
                انصراف
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default AddressCard;
