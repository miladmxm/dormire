import { Suspense } from "react";

import { getUserCart } from "@/features/cart/dal/query";
import {
  getPendingUserOrder,
  getUserAddress,
} from "@/features/shipping/dal/query";

import CheckoutStepsHandler from "../_containers/checkoutStepsHandler";
import CheckoutContextProvider from "../_contexts";
import SetShippingStoreOnMounted from "../../_components/setShippingStoreOnMounted";

const CheckoutPage = async ({ params }: PageProps<"/checkout/[[...id]]">) => {
  const { id } = await params;

  const userOrderForPay = id ? await getPendingUserOrder(id[0]) : undefined;

  const address = getUserAddress();
  const cart = getUserCart();
  return (
    <CheckoutContextProvider
      order={userOrderForPay}
      cart={cart}
      address={address}
    >
      <SetShippingStoreOnMounted step={userOrderForPay ? 4 : 2} />
      <CheckoutStepsHandler />
    </CheckoutContextProvider>
  );
};

export const checkoutPageWrapper = (
  props: PageProps<"/checkout/[[...id]]">,
) => {
  return (
    <Suspense>
      <CheckoutPage {...props} />
    </Suspense>
  );
};

export default checkoutPageWrapper;
