import { Suspense } from "react";

import InvoiceTotalList from "./invoiceTotalList";
import NextStepButton from "./nextStepButton";
import ShippingInformation from "./shippingInformation";

const InvoiceTotalSidebar = ({ orderId }: { orderId?: string }) => {
  return (
    <aside className="shadow-lg-gray rounded-7xl p-4 ">
      <div className="rounded-6xl border border-primary-500 size-full p-4 flex flex-col gap-6">
        <h4 className="text-xl font-bold text-center">سفارش شما</h4>
        <Suspense>
          <InvoiceTotalList orderId={orderId} />
        </Suspense>
        <ShippingInformation />
        <NextStepButton />
      </div>
    </aside>
  );
};

export default InvoiceTotalSidebar;
