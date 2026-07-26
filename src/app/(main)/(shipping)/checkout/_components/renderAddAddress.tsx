"use client";

import type { ComponentProps } from "react";

import { AnimatePresence, motion } from "motion/react";

import { useShippingContext } from "../../_store";
import AddressForm from "./addressForm";

const RenderAddAddress = ({
  submitButtonRef,
}: ComponentProps<typeof AddressForm>) => {
  const isAddAddress = useShippingContext((store) => store.isAddAddress);
  return (
    <AnimatePresence>
      {isAddAddress && (
        <motion.div
          exit={{ y: 60, opacity: 0 }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.7 }}
        >
          <AddressForm submitButtonRef={submitButtonRef} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RenderAddAddress;
