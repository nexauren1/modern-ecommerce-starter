import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/data";

export default function HomePage() {
  return <main>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy">
      <p className="hero-kicker">MODERN E-COMMERCE STARTER</p><h1>Build a storefront people remember.</h1>
      <p className="hero-text">A premium commerce foundation with a polished storefront, scalable admin dashboard and a backend connection designed for real businesses.</p>
      <div className="hero-actions"><Link href="/shop" className="button button-primary">Explore products</Link><Link href="/admin" className="button button-secondary">Open admin</Link></div>
      <div className="hero-proof"><div><strong>4.9/5</strong><span>customer rating</span></div><div><strong>24h</strong><span>support-ready UX</span></div><div><strong>100%</strong><span>responsive</span></div></div>
    </div><div className="hero-visual"><div className="hero-glow"/><div className="floating-card card-one"><span>Featured</span><strong>New season</strong></div><div className="hero-product"><img src={products[0].image} alt={products[0].name}/></div><div className="floating-card card-two"><span>Live store</span><strong>128 orders</strong></div></div></div></section>

    <section className="section" id="categories"><div className="container"><div className="section-heading"><div><p className="eyebrow">SHOP BY CATEGORY</p><h2>Everything in one place.</h2></div><Link href="/shop" className="text-link">View all products →</Link></div>
      <div className="category-grid">{categories.map(c => <Link href="/shop" className="category-card" key={c.name}><span>{c.accent}</span><div><h3>{c.name}</h3><p>{c.count} products</p></div><strong>↗</strong></Link>)}</div>
    </div></section>

    <section className="section section-muted" id="story"><div className="container"><div className="section-heading"><div><p className="eyebrow">FEATURED COLLECTION</p><h2>Products worth coming back for.</h2></div></div><div className="product-grid">{products.map(p => <ProductCard product={p} key={p.id}/>)}</div></div></section>

    <section className="section"><div className="container launch-banner"><div><p className="eyebrow">BUILT FOR CUSTOMIZATION</p><h2>Start with the design. Make the business yours.</h2></div><Link href="/admin" className="button button-primary">Configure store</Link></div></section>
  </main>;
}
