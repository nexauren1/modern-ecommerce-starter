"use client";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container nav-row">
    <Link href="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">M</span>Modern<span>Commerce</span></Link>
    <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(v => !v)}><span/><span/><span/></button>
    <nav className={open ? "main-nav open" : "main-nav"}>
      <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
      <Link href="/#categories" onClick={() => setOpen(false)}>Categories</Link>
      <Link href="/#story" onClick={() => setOpen(false)}>Our story</Link>
      <Link href="/admin" className="nav-admin" onClick={() => setOpen(false)}>Admin</Link>
    </nav>
    <Link href="/shop" className="cart-button">Bag <span className="cart-count">0</span></Link>
  </div></header>;
}
