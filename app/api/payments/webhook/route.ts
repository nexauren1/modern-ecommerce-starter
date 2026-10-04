import { NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payment";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const provider = getPaymentProvider();
    const event = await provider.verifyWebhook(request);

    // Persist the order/payment status here with your selected database.
    // The provider abstraction intentionally does not lock the template to one payment vendor.
    return NextResponse.json({ received: true, provider: provider.name, event });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid payment webhook." },
      { status: 400 }
    );
  }
}
