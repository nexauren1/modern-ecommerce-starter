import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — ModernCommerce",
  description: "Private administrator sign-in for the store owner.",
};

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <div className="admin-login-shell">
        <section className="admin-login-copy">
          <p className="eyebrow">PRIVATE ADMIN</p>
          <h1>Your store.<br />Your control room.</h1>
          <p>Sign in with the owner credentials configured on your server. Admin credentials are never shipped to the browser or committed to GitHub.</p>
        </section>
        <section className="admin-login-card">
          <div><p className="eyebrow">OWNER ACCESS</p><h2>Sign in</h2></div>
          <form action="/api/admin/login" method="post" className="admin-login-form">
            <label>Email<input name="email" type="email" autoComplete="username" required placeholder="owner@example.com" /></label>
            <label>Password<input name="password" type="password" autoComplete="current-password" required placeholder="Your private password" /></label>
            <button className="button button-primary full-width" type="submit">Enter Admin</button>
          </form>
          <p className="admin-login-note">Set <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD</code> and <code>SESSION_SECRET</code> in your deployment environment.</p>
        </section>
      </div>
    </main>
  );
}
