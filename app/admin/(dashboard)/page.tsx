import Link from "next/link";
import { categories, products } from "@/lib/data";

const stats = [
  { label: "Revenue", value: "$8,492", change: "+12.8%" },
  { label: "Orders", value: "128", change: "+8.4%" },
  { label: "Customers", value: "2,418", change: "+14.2%" },
  { label: "Products", value: String(products.length), change: "Demo" }
];

export default function AdminDashboardPage() {
  return (
    <main className="admin-page">
      <section className="admin-topbar"><div className="container admin-heading">
        <div><p className="eyebrow">PRIVATE ADMIN DASHBOARD</p><h1>Good morning, store owner.</h1><p>Manage products, orders and your backend connection from one place.</p></div>
        <div className="admin-heading-actions"><Link href="/" className="button button-secondary">View store</Link><form action="/api/admin/logout" method="post"><button className="button button-primary" type="submit">Sign out</button></form></div>
      </div></section>
      <section className="section"><div className="container">
        <div className="stats-grid">{stats.map(stat => <div className="stat-card" key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.change}</small></div>)}</div>
        <div className="admin-grid">
          <section className="admin-card"><div className="admin-card-heading"><div><p className="eyebrow">CATALOG</p><h2>Products</h2></div><button className="button button-primary" type="button">+ Add product</button></div>
            <div className="admin-table">{products.map(product => <div className="admin-row" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{product.category}</span></div><strong>{"$"}{product.price.toFixed(2)}</strong><button className="icon-button" type="button" aria-label={"Edit " + product.name}>•••</button></div>)}</div>
          </section>
          <aside className="admin-card setup-card"><p className="eyebrow">BACKEND</p><h2>Connect your store</h2><p>Demo Mode works immediately. Firebase configuration can be added for production data.</p><div className="setup-status"><span className="status-dot" />Demo Mode</div><div className="setup-steps"><div><span>1</span>Create a Firebase project</div><div><span>2</span>Register a Web App</div><div><span>3</span>Add Firebase values to <code>.env.local</code></div></div><Link href="/admin/setup" className="button button-secondary full-width">Open setup guide</Link></aside>
        </div>
        <section className="admin-card categories-admin"><div className="admin-card-heading"><div><p className="eyebrow">STORE TAXONOMY</p><h2>Categories</h2></div></div><div className="mini-category-grid">{categories.map(category => <div className="mini-category" key={category.name}><span>{category.accent}</span><div><strong>{category.name}</strong><small>{category.count} products</small></div></div>)}</div></section>
      </div></section>
    </main>
  );
}
