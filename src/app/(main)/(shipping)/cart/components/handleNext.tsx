"use client";

import { useRouter } from "next/navigation";

import SetShippingStoreOnMounted from "../../_components/setShippingStoreOnMounted";

const HandleNext = () => {
  const router = useRouter();

  return (
    <SetShippingStoreOnMounted
      isDisabledNextAction={false}
      step={1}
      nextStepAction={() => {
        router.push("/checkout");
      }}
      nextButtonLabel="تکمیل فرایند خرید"
    />
  );
};

export default HandleNext;
