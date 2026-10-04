import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/lib/data";
import { getProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main>
      <section className="page-hero"><div className="container"><p className="eyebrow">STORE</p><h1>Shop the collection.</h1><p>Products are read from the connected backend when configured, with Demo Mode available out of the box.</p></div></section>
      <section className="section">
        <div className="container shop-layout">
          <aside className="filter-panel"><p className="eyebrow">CATEGORIES</p>{categories.map(c => <button key={c.name}>{c.name}<span>{c.count}</span></button>)}</aside>
          <div className="shop-results">
            <div className="results-bar"><span>{products.length} products</span><select defaultValue="featured" aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div>
            <div className="product-grid">{products.map(product => <ProductCard product={product} key={product.id} />)}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
