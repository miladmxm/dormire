import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
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
    return NextResponse.redirect(new URL("/callback/invalid", request.url));
  }

  const { isOk, message } = await verifyPayment({
    gateway: output.gateway,
    url: request.url,
    body,
    orderId: output.orderId,
  });

  if (!isOk) {
    return NextResponse.redirect(
      new URL(`/callback/${output.orderId}?message=${message}`, request.url),
    );
  }

  return NextResponse.redirect(
    new URL(`/callback/${output.orderId}`, request.url),
  );
}

export const GET = handler;
export const POST = handler;
