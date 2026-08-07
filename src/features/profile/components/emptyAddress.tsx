import { MapPin } from "lucide-react";

import { setShowNewAddress } from "../store/address";

const EmptyAddress = () => {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-4xl border border-dashed border-primary-500 bg-primary-50/70 p-7 text-center">
      <div className="center mb-5 size-16 rounded-3xl bg-thready-500 text-thready-900">
        <MapPin className="size-7" />
      </div>
      <h3 className="text-lg font-black text-gray-900">هنوز نشانی ندارید</h3>
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
  );
};

export default EmptyAddress;
