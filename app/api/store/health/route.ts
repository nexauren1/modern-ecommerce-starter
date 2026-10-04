import { NextResponse } from "next/server";
import { firebaseConfigured } from "@/lib/firebase";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    mode: process.env.FIREBASE_ADMIN_PROJECT_ID ? "live" : "demo",
    firebaseWebConfigured: firebaseConfigured,
    paymentProvider: process.env.PAYMENT_PROVIDER ?? "custom",
  });
}
