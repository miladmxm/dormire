import type { PropsWithChildren } from "react";

import NavigationProgress from "./_components/navigationProgress";
import ShipingContextProvider from "./_store";

const ShippingInitialization = async ({ children }: PropsWithChildren) => {
  return <ShipingContextProvider>{children}</ShipingContextProvider>;
};

const ShippingLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <ShippingInitialization>
      <NavigationProgress />

      {children}
    </ShippingInitialization>
  );
};

export default ShippingLayout;
