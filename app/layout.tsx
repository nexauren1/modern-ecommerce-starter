import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "ModernCommerce — E-commerce Starter",
  description: "A polished e-commerce starter template with storefront, admin dashboard and Firebase-ready architecture.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<footer className="site-footer"><div className="container footer-row"><div><strong>ModernCommerce</strong><p>Commerce infrastructure designed to be customized and launched.</p></div><span>© 2026 ModernCommerce</span></div></footer></body></html>;
}
