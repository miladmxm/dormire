"use client";

import { redirect } from "next/navigation";
import { Suspense, use, useRef } from "react";

import SeparatorLine from "@/components/ui/separatorLine";

import AddAddressToggler from "../_components/addAddressToggler";
import AddressList, { AddressListSkeleton } from "../_components/addressList";
import RenderAddAddress from "../_components/renderAddAddress";
import { useCheckoutContext } from "../_contexts";

const CheckCartItems = () => {
  const { cart: cartPromise } = useCheckoutContext();
  const cart = use(cartPromise);

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  return null;
};

const AddressSelection = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Suspense fallback={<AddressListSkeleton />}>
        <CheckCartItems />
        <AddressList />
      </Suspense>
      <SeparatorLine size="4" />
      <AddAddressToggler submitButtonRef={buttonRef} />
      <RenderAddAddress submitButtonRef={buttonRef} />
    </>
  );
};

export default AddressSelection;
