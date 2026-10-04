import { NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payment";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      orderId: string;
      amount: number;
      currency: string;
      customerEmail?: string;
      metadata?: Record<string, string>;
    };

    if (!body.orderId || !Number.isFinite(body.amount) || body.amount <= 0 || !body.currency) {
      return NextResponse.json({ error: "Invalid checkout payload." }, { status: 400 });
    }

    const provider = getPaymentProvider();
    const origin = new URL(request.url).origin;

    const session = await provider.createCheckout({
      ...body,
      returnUrl: origin + "/checkout/success",
      cancelUrl: origin + "/checkout/cancel",
    });

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create checkout." },
      { status: 500 }
    );
  }
}
