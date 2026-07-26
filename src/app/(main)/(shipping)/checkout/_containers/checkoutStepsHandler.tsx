"use client";

import { useShippingContext } from "../../_store";
import AcceptAndPayment from "./acceptAndPayment";
import AddressSelection from "./addressSelection";
import SendignMethod from "./sendignMethod";

const CheckoutStepsHandler = () => {
  const step = useShippingContext((store) => store.step);

  if (step === 3) {
    return <SendignMethod />;
  } else if (step === 4) {
    return <AcceptAndPayment />;
  } else {
    return (
      <section>
        <AddressSelection />
      </section>
    );
  }
};

export default CheckoutStepsHandler;
