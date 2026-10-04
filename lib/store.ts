import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { products as demoProducts, type Product } from "@/lib/data";

let adminApp: App | null = null;

function getAdminFirestore(): Firestore | null {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) return null;

  adminApp =
    getApps()[0] ??
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

  return getFirestore(adminApp);
}

async function restRequest(path: string, init: RequestInit = {}) {
  const baseUrl = process.env.DATA_API_BASE_URL;
  const apiKey = process.env.DATA_API_KEY;
  if (!baseUrl || !apiKey) throw new Error("DATA_API_BASE_URL and DATA_API_KEY are required for REST data mode.");

  const response = await fetch(new URL(path, baseUrl), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Data provider request failed.");
  return response;
}

async function getRestProducts(): Promise<Product[]> {
  const response = await restRequest(process.env.DATA_PRODUCTS_PATH ?? "/products");
  const data = (await response.json()) as Product[] | { products?: Product[] };
  return Array.isArray(data) ? data : (data.products ?? []);
}

async function createRestProduct(input: Omit<Product, "id">) {
  const response = await restRequest(process.env.DATA_PRODUCTS_PATH ?? "/products", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return (await response.json()) as Product;
}

async function updateRestProduct(id: string, input: Partial<Omit<Product, "id">>) {
  const base = process.env.DATA_PRODUCTS_PATH ?? "/products";
  const response = await restRequest(base.replace(/\/$/, "") + "/" + encodeURIComponent(id), {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  return (await response.json()) as Product;
}

async function deleteRestProduct(id: string) {
  const base = process.env.DATA_PRODUCTS_PATH ?? "/products";
  await restRequest(base.replace(/\/$/, "") + "/" + encodeURIComponent(id), { method: "DELETE" });
}

export async function getProducts(): Promise<Product[]> {
  const provider = (process.env.DATA_PROVIDER ?? "firebase").toLowerCase();

  if (provider === "demo") return demoProducts;
  if (provider === "rest") {
    const items = await getRestProducts();
    return items.length ? items : demoProducts;
  }

  const db = getAdminFirestore();
  if (!db) return demoProducts;

  const snapshot = await db.collection("products").orderBy("createdAt", "desc").get();
  if (snapshot.empty) return demoProducts;

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
}

export async function createProduct(input: Omit<Product, "id">) {
  const provider = (process.env.DATA_PROVIDER ?? "firebase").toLowerCase();
  if (provider === "rest") return createRestProduct(input);

  const db = getAdminFirestore();
  if (!db) throw new Error("Firebase Admin is not configured.");
  const ref = db.collection("products").doc();
  await ref.set({ ...input, createdAt: Date.now(), updatedAt: Date.now() });
  return { id: ref.id, ...input };
}

export async function updateProduct(id: string, input: Partial<Omit<Product, "id">>) {
  const provider = (process.env.DATA_PROVIDER ?? "firebase").toLowerCase();
  if (provider === "rest") return updateRestProduct(id, input);

  const db = getAdminFirestore();
  if (!db) throw new Error("Firebase Admin is not configured.");
  await db.collection("products").doc(id).set(
    { ...input, updatedAt: Date.now() },
    { merge: true }
  );
  const snapshot = await db.collection("products").doc(id).get();
  return { id: snapshot.id, ...(snapshot.data() as Omit<Product, "id">) };
}

export async function deleteProduct(id: string) {
  const provider = (process.env.DATA_PROVIDER ?? "firebase").toLowerCase();
  if (provider === "rest") return deleteRestProduct(id);

  const db = getAdminFirestore();
  if (!db) throw new Error("Firebase Admin is not configured.");
  await db.collection("products").doc(id).delete();
}
