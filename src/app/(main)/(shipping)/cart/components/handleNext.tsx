"use client";

import { useRouter } from "next/navigation";

import SetShippingStoreOnMounted from "../../_components/setShippingStoreOnMounted";

const HandleNext = () => {
  const router = useRouter();

  return (
    <SetShippingStoreOnMounted
      step={1}
      // isDisabledNextAction={false}
      nextStepAction={() => {
        router.push("/checkout");
      }}
      nextButtonLabel="تکمیل فرایند خرید"
    />
  );
};

export default HandleNext;
