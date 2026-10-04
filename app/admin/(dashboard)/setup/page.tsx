import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";

export default async function AdminSetupPage() {
  const store = await cookies();
  if (!verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value)) redirect("/admin/login");
  const adminEnv = "ADMIN_EMAIL=you@example.com\nADMIN_PASSWORD=choose-a-long-private-password\nSESSION_SECRET=generate-a-long-random-secret";
  const firebaseEnv = "NEXT_PUBLIC_FIREBASE_API_KEY=\nNEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=\nNEXT_PUBLIC_FIREBASE_PROJECT_ID=\nNEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=\nNEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=\nNEXT_PUBLIC_FIREBASE_APP_ID=";
  return <main className="admin-page">
    <section className="page-hero"><div className="container"><p className="eyebrow">BACKEND SETUP</p><h1>Connect your own backend.</h1><p>Keep admin secrets on the server and use your own Firebase project for production data.</p></div></section>
    <section className="section"><div className="container setup-document">
      <div className="admin-card"><p className="eyebrow">OWNER ENVIRONMENT</p><h2>Private admin credentials</h2><p>The admin email, password and session secret are server-only variables. Never commit them to GitHub.</p><pre><code>{adminEnv}</code></pre></div>
      <div className="admin-card"><p className="eyebrow">FIREBASE</p><h2>Production data</h2><p>Connect your Firebase Web App when you are ready to move products, images, customers and orders out of demo mode.</p><pre><code>{firebaseEnv}</code></pre></div>
    </div></section>
  </main>;
}
