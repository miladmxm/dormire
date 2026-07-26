"use client";

import { use, useEffect, useEffectEvent } from "react";

import Skeleton from "@/components/ui/skeleton";

import { useCheckoutContext } from "../_contexts";
import { useSetShippingState } from "../../_store";
import AddressCard from "./addressCard";

export const AddressListSkeleton = () => {
  return (
    <div className="py-3 my-6 grid grid-cols-2 gap-4 auto-rows-auto">
      {[...Array(4).fill(null)].map((_, index) => (
        <Skeleton
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={`String(_) + ${index}`}
          className="w-full h-20 rounded-4xl"
        />
      ))}
    </div>
  );
};

const AddressList = () => {
  const { address: addressPromise } = useCheckoutContext();
  const address = use(addressPromise);
  const setShippingState = useSetShippingState();
  const handleChangeAddress = useEffectEvent(() => {
    if (address.length === 0) {
      setShippingState({
        isAddAddress: false,
      });
    }
  });
  useEffect(() => {
    handleChangeAddress();
  }, [address]);
  if (address.length === 0)
    return (
      <h5 className="text-center py-6 font-bold">
        شما هنوز آدرسی ثبت نکرده اید
      </h5>
    );
  return (
    <div>
      آدرس های پیشین شما:
      <div className="py-3 my-6 grid grid-cols-2 gap-4 auto-rows-auto">
        {address.map((item) => (
          <AddressCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AddressList;
