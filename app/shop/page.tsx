import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/data";

export default function ShopPage() {
  return <main><section className="page-hero"><div className="container"><p className="eyebrow">STORE</p><h1>Shop the collection.</h1><p>Demo catalog today. Connect Firebase later to manage real products from the admin dashboard.</p></div></section>
  <section className="section"><div className="container shop-layout"><aside className="filter-panel"><p className="eyebrow">CATEGORIES</p>{categories.map(c => <button key={c.name}>{c.name}<span>{c.count}</span></button>)}</aside>
  <div className="shop-results"><div className="results-bar"><span>{products.length} demo products</span><select defaultValue="featured" aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div><div className="product-grid">{products.map(p => <ProductCard product={p} key={p.id}/>)}</div></div></div></section></main>;
}
