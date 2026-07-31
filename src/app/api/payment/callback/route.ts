import type { NextRequest } from "next/server";

import * as v from "valibot";

import { VerifyCallbackParams } from "@/features/shipping/validations";
import { verifyPayment } from "@/services/shipping/payment.service";

async function handler(request: NextRequest) {
  let body: Record<string, unknown>;
  const queryEntries = Object.fromEntries(
    new URL(request.url).searchParams.entries(),
  );

  if (request.method === "POST") {
    body = Object.fromEntries(await request.formData());
  } else {
    body = queryEntries;
  }

  const { success, output } = v.safeParse(VerifyCallbackParams, queryEntries);

  if (!success) {
    return new Response("nok");
  }

  //todo verify payment
  const { isOk, message } = await verifyPayment({
    gateway: output.gateway,
    url: request.url,
    body,
    orderId: output.orderId,
  });

  if (!isOk) {
    return new Response(`nok ${message}`);
  }

  return new Response("helo");
  // return redirect("/callback");
}

export const GET = handler;
export const POST = handler;
