"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";

type Draft = Omit<Product, "id">;

const blankDraft: Draft = {
  name: "",
  category: "",
  price: 0,
  compareAtPrice: undefined,
  description: "",
  image: "",
  badge: "",
  rating: 5,
};

export function ProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const [items, setItems] = useState(initialProducts);
  const [draft, setDraft] = useState<Draft>(blankDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  function updateField<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function startCreate() {
    setEditingId(null);
    setDraft(blankDraft);
    setMessage("");
    setOpen(true);
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setDraft({
      name: product.name,
      category: product.category,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      description: product.description,
      image: product.image,
      badge: product.badge,
      rating: product.rating,
    });
    setMessage("");
    setOpen(true);
  }

  async function saveProduct(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const url = editingId ? "/api/admin/products/" + editingId : "/api/admin/products";
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const payload = await response.json();

      if (!response.ok) throw new Error(payload.error ?? "Unable to save product.");

      if (editingId) {
        setItems((current) => current.map((item) => item.id === editingId ? payload.product : item));
      } else {
        setItems((current) => [payload.product, ...current]);
      }

      setOpen(false);
      setEditingId(null);
      setDraft(blankDraft);
      setMessage(editingId ? "Product updated." : "Product published.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save product.");
    } finally {
      setBusy(false);
    }
  }

  async function removeProduct(id: string) {
    if (!window.confirm("Delete this product?")) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/products/" + id, { method: "DELETE" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Unable to delete product.");
      setItems((current) => current.filter((item) => item.id !== id));
      setMessage("Product deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete product.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-card">
      <div className="admin-card-heading">
        <div><p className="eyebrow">CATALOG</p><h2>Products</h2></div>
        <button className="button button-primary" type="button" onClick={startCreate}>+ Add product</button>
      </div>

      {message ? <div className="admin-message">{message}</div> : null}

      <div className="admin-table">
        {items.map((product) => (
          <div className="admin-row" key={product.id}>
            <img src={product.image} alt="" />
            <div><strong>{product.name}</strong><span>{product.category}</span></div>
            <strong>{"$"}{product.price.toFixed(2)}</strong>
            <div className="row-actions">
              <button className="icon-button" type="button" onClick={() => startEdit(product)}>Edit</button>
              <button className="icon-button danger" type="button" onClick={() => removeProduct(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {open ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <form className="product-form admin-card" onSubmit={saveProduct}>
            <div className="admin-card-heading">
              <div><p className="eyebrow">PRODUCT</p><h2>{editingId ? "Edit product" : "Add product"}</h2></div>
              <button className="icon-button" type="button" onClick={() => setOpen(false)}>Close</button>
            </div>

            <div className="form-grid">
              <label>Product name<input required value={draft.name} onChange={(e) => updateField("name", e.target.value)} /></label>
              <label>Category<input required value={draft.category} onChange={(e) => updateField("category", e.target.value)} /></label>
              <label>Price<input required min="0" step="0.01" type="number" value={draft.price} onChange={(e) => updateField("price", Number(e.target.value))} /></label>
              <label>Compare-at price<input min="0" step="0.01" type="number" value={draft.compareAtPrice ?? ""} onChange={(e) => updateField("compareAtPrice", e.target.value === "" ? undefined : Number(e.target.value))} /></label>
              <label className="full-span">Image URL<input required type="url" placeholder="https://..." value={draft.image} onChange={(e) => updateField("image", e.target.value)} /></label>
              <label>Badge<input placeholder="New / Best seller" value={draft.badge ?? ""} onChange={(e) => updateField("badge", e.target.value)} /></label>
              <label>Rating<input min="0" max="5" step="0.1" type="number" value={draft.rating} onChange={(e) => updateField("rating", Number(e.target.value))} /></label>
              <label className="full-span">Description<textarea required rows={4} value={draft.description} onChange={(e) => updateField("description", e.target.value)} /></label>
            </div>

            <div className="form-actions">
              <button className="button button-secondary" type="button" onClick={() => setOpen(false)}>Cancel</button>
              <button className="button button-primary" type="submit" disabled={busy}>{busy ? "Saving..." : editingId ? "Save changes" : "Publish product"}</button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
