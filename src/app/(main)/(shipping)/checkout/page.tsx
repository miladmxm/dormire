import { getUserCart } from "@/features/cart/dal/query";
import { getUserAddress } from "@/features/shipping/dal/query";

import SetShippingStoreOnMounted from "../_components/setShippingStoreOnMounted";
import CheckoutStepsHandler from "./_containers/checkoutStepsHandler";
import CheckoutContextProvider from "./_contexts";

const CheckoutPage = async () => {
  const address = getUserAddress();
  const cart = getUserCart();
  return (
    <CheckoutContextProvider cart={cart} address={address}>
      <SetShippingStoreOnMounted step={2} />
      <CheckoutStepsHandler />
    </CheckoutContextProvider>
  );
};

export default CheckoutPage;
