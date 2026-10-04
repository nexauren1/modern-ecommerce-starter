import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card">
    <div className="product-image-wrap">
      {product.badge ? <span className="product-badge">{product.badge}</span> : null}
      <img src={product.image} alt={product.name} className="product-image" />
      <button className="quick-add" aria-label={"Add " + product.name + " to cart"}>+</button>
    </div>
    <div className="product-meta"><div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3></div><p className="rating">★ {product.rating.toFixed(1)}</p></div>
    <p className="product-description">{product.description}</p>
    <div className="price-row"><strong>{"$"}{product.price.toFixed(2)}</strong>{product.compareAtPrice ? <span>{"$"}{product.compareAtPrice.toFixed(2)}</span> : null}</div>
  </article>;
}
