import { Suspense } from "react";

import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CallbackPage = async ({
  searchParams,
  params,
}: PageProps<"/callback/[orderId]">) => {
  const { message } = await searchParams;
  const { orderId } = await params;
  const callbackSuccess = Boolean(orderId === "true");

  return (
    <main className="container py-10">
      <section
        className={cn(
          "min-h-[60svh] py-10 border border-primary-500 rounded-4xl flex flex-col gap-6 items-center justify-center border-dashed",
          { "border-error": !callbackSuccess },
        )}
      >
        <h1
          className={cn("text-3xl text-center font-bold", {
            "text-success": callbackSuccess,
            "text-error": !callbackSuccess,
          })}
        >
          {callbackSuccess ? "خرید موفقیت آمیز بود" : "خرید ناموفق بود"}
        </h1>
        {callbackSuccess ? (
          <Button variant="secondary" className="max-w-sm">
            حساب کاربری
          </Button>
        ) : (
          <Button variant="secondary" className="max-w-sm">
            پرداخت دوباره
          </Button>
        )}
      </section>
    </main>
  );
};

const CallbackPageWrapper = (props: PageProps<"/callback/[orderId]">) => {
  return (
    <Suspense>
      <CallbackPage {...props} />
    </Suspense>
  );
};

export default CallbackPageWrapper;
