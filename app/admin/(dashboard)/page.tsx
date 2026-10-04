import Link from "next/link";
import { categories } from "@/lib/data";
import { getProducts } from "@/lib/store";
import { ProductManager } from "@/components/ProductManager";

export const dynamic = "force-dynamic";

const stats = [
  { label: "Revenue", value: "$8,492", change: "+12.8%" },
  { label: "Orders", value: "128", change: "+8.4%" },
];

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const liveMode = Boolean(process.env.FIREBASE_ADMIN_PROJECT_ID);

  return (
    <main className="admin-page">
      <section className="admin-topbar">
        <div className="container admin-heading">
          <div>
            <p className="eyebrow">PRIVATE ADMIN DASHBOARD</p>
            <h1>Good morning, store owner.</h1>
            <p>Manage products, orders and your backend connection from one place.</p>
          </div>
          <div className="admin-heading-actions">
            <Link href="/" className="button button-secondary">View store</Link>
            <form action="/api/admin/logout" method="post">
              <button className="button button-primary" type="submit">Sign out</button>
            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.change}</small>
              </div>
            ))}
            <div className="stat-card"><span>Products</span><strong>{products.length}</strong><small>Live catalog</small></div>
            <div className="stat-card"><span>Mode</span><strong>{liveMode ? "Live" : "Demo"}</strong><small>Backend status</small></div>
          </div>

          <ProductManager initialProducts={products} />

          <section className="admin-card categories-admin">
            <div className="admin-card-heading"><div><p className="eyebrow">STORE TAXONOMY</p><h2>Categories</h2></div></div>
            <div className="mini-category-grid">
              {categories.map((category) => (
                <div className="mini-category" key={category.name}>
                  <span>{category.accent}</span>
                  <div><strong>{category.name}</strong><small>{category.count} demo products</small></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
