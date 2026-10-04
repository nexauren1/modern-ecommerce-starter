import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createAdminSession, credentialsMatch } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");

  try {
    if (!credentialsMatch(email, password)) {
      return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), 303);
    }
    const response = NextResponse.redirect(new URL("/admin", request.url), 303);
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: createAdminSession(email),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url), 303);
  }
}
