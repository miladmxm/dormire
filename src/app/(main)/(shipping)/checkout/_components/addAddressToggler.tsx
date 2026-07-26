"use client";

import { motion } from "motion/react";

import Plus from "@/assets/icons/plus.svg";

import type { AddressFormProps } from "./addressForm";

import { useSetShippingState, useShippingContext } from "../../_store";

const AddAddressToggler = ({ submitButtonRef }: AddressFormProps) => {
  const setShippingState = useSetShippingState();
  const isAddAddress = useShippingContext((store) => store.isAddAddress);

  const handleToggle = () => {
    if (isAddAddress) {
      setShippingState({ isAddAddress: false });
    } else {
      setShippingState({
        isAddAddress: true,
        isDisabledNextAction: false,
        nextStepAction: () => submitButtonRef.current?.click(),
        addressId: undefined,
      });
    }
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className="underline my-4 flex gap-1 items-center"
    >
      <motion.span
        animate={{
          rotate: isAddAddress ? "45deg" : "0",
        }}
        transition={{ type: "spring", duration: 0.3, damping: 8 }}
      >
        <Plus className="size-4" />
      </motion.span>
      <span>افزودن آدرس جدید</span>
    </button>
  );
};

export default AddAddressToggler;
