import type { PropsWithChildren } from "react";

import { Suspense } from "react";

import { getUserCart } from "@/features/cart/dal/query";
import { getUserOrders } from "@/features/shipping/dal/query";

import InvoiceTotalSidebar from "./_components/invoiceTotalSidebar";
import NavigationProgress from "./_components/navigationProgress";
import ShipingContextProvider from "./_store";

const ShippingInitialization = async ({ children }: PropsWithChildren) => {
  const orders = await getUserOrders();
  const cartItems = await getUserCart();

  console.log(orders, cartItems);
  return (
    <ShipingContextProvider
    // isDisabledNextAction={cartItems?.items.length === 0}
    >
      {children}
    </ShipingContextProvider>
  );
};

const ShippingLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <Suspense>
      <ShippingInitialization>
        <NavigationProgress />
        <main className="container py-6">
          <div className="grid max-w-full lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] gap-4">
            {children}
            <InvoiceTotalSidebar />
          </div>
        </main>
      </ShippingInitialization>
    </Suspense>
  );
};

export default ShippingLayout;
