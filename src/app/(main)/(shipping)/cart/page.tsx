import { Suspense } from "react";

import { getUserCart } from "@/features/cart/dal/query";

import InvoiceTotalSidebar from "../_components/invoiceTotalSidebar";
import CartList from "./_containers/cartList";
import { CartCardSkeleton } from "./components/cartCard";
import HandleNext from "./components/handleNext";

async function CartContent() {
  const cart = await getUserCart();
  return (
    <>
      <HandleNext />
      <CartList items={cart?.items || []} />
    </>
  );
}

export default async function CartPage() {
  return (
    <main className="container py-6">
      <div className="grid max-w-full lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] gap-4">
        <div className="flex flex-col gap-6 py-12">
          <Suspense fallback={<CartCardSkeleton />}>
            <CartContent />
          </Suspense>
        </div>
        <InvoiceTotalSidebar />
      </div>
    </main>
  );
}
