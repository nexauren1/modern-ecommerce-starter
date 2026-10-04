import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const session = verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value);
  if (!session) redirect("/admin/login");
  return children;
}
