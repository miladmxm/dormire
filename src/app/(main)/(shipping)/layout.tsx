import type { PropsWithChildren } from "react";

import { getUserOrders } from "@/features/shipping/dal/query";

import InvoiceTotalSidebar from "./_components/invoiceTotalSidebar";
import NavigationProgress from "./_components/navigationProgress";
import ShipingContextProvider from "./_store";

const ShippingInitialization = ({ children }: PropsWithChildren) => {
  const orders = getUserOrders();
  return <ShipingContextProvider>{children}</ShipingContextProvider>;
};

const ShippingLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <ShippingInitialization>
      <NavigationProgress />

      <main className="container py-6">
        <div className="grid max-w-full lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] gap-4">
          {children}
          <InvoiceTotalSidebar />
        </div>
      </main>
    </ShippingInitialization>
  );
};

export default ShippingLayout;
