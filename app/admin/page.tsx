import Link from "next/link";
import { categories, products } from "@/lib/data";

const stats = [{ label: "Revenue", value: "$8,492", change: "+12.8%" },{ label: "Orders", value: "128", change: "+8.4%" },{ label: "Customers", value: "2,418", change: "+14.2%" },{ label: "Products", value: String(products.length), change: "Demo" }];

export default function AdminPage() {
  return <main className="admin-page"><section className="admin-topbar"><div className="container admin-heading"><div><p className="eyebrow">ADMIN DASHBOARD</p><h1>Good morning, store owner.</h1><p>Manage products, orders and your backend connection from one place.</p></div><Link href="/" className="button button-secondary">View store</Link></div></section>
  <section className="section"><div className="container"><div className="stats-grid">{stats.map(s => <div className="stat-card" key={s.label}><span>{s.label}</span><strong>{s.value}</strong><small>{s.change}</small></div>)}</div>
  <div className="admin-grid"><section className="admin-card"><div className="admin-card-heading"><div><p className="eyebrow">CATALOG</p><h2>Products</h2></div><button className="button button-primary">+ Add product</button></div>
  <div className="admin-table">{products.map(p => <div className="admin-row" key={p.id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><span>{p.category}</span></div><strong>{"$"}{p.price.toFixed(2)}</strong><button className="icon-button" aria-label={"Edit " + p.name}>•••</button></div>)}</div></section>
  <aside className="admin-card setup-card"><p className="eyebrow">BACKEND</p><h2>Connect your store</h2><p>This starter runs in Demo Mode out of the box. Add your Firebase project credentials when you are ready for production data.</p><div className="setup-status"><span className="status-dot"/>Demo Mode</div><div className="setup-steps"><div><span>1</span>Create a Firebase project</div><div><span>2</span>Register a Web App</div><div><span>3</span>Add the values from <code>.env.local</code></div></div><button className="button button-secondary full-width">Open setup guide</button></aside></div>
  <section className="admin-card categories-admin"><div className="admin-card-heading"><div><p className="eyebrow">STORE TAXONOMY</p><h2>Categories</h2></div></div><div className="mini-category-grid">{categories.map(c => <div className="mini-category" key={c.name}><span>{c.accent}</span><div><strong>{c.name}</strong><small>{c.count} products</small></div></div>)}</div></section>
  </div></section></main>;
}
