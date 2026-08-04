import { Suspense } from "react";

import { getUserCart } from "@/features/cart/dal/query";
import {
  getPendingUserOrder,
  getUserAddress,
} from "@/features/shipping/dal/query";

import CheckoutStepsHandler from "../_containers/checkoutStepsHandler";
import CheckoutContextProvider from "../_contexts";
import InvoiceTotalSidebar from "../../_components/invoiceTotalSidebar";
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
      <main className="container py-6">
        <div className="grid max-w-full lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] gap-4">
          <CheckoutPage {...props} />
          <InvoiceTotalSidebar />
        </div>
      </main>
    </Suspense>
  );
};

export default checkoutPageWrapper;
