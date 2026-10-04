import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { products as demoProducts, type Product } from "@/lib/data";

type BackendProvider = "demo" | "firebase" | "rest";

let adminApp: App | null = null;

function provider(): BackendProvider {
  const value = process.env.BACKEND_PROVIDER?.toLowerCase();
  if (value === "firebase" || value === "rest") return value;
  return "demo";
}

function getFirebaseDb(): Firestore | null {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) return null;

  adminApp = getApps()[0] ?? initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return getFirestore(adminApp);
}

function restConfig() {
  const baseUrl = process.env.BACKEND_API_BASE_URL;
  if (!baseUrl) throw new Error("BACKEND_API_BASE_URL is required when BACKEND_PROVIDER=rest.");

  const headerName = process.env.BACKEND_API_KEY_HEADER || "Authorization";
  const apiKey = process.env.BACKEND_API_KEY;
  const bearerToken = process.env.BACKEND_BEARER_TOKEN;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (bearerToken) headers[headerName] = "Bearer " + bearerToken;
  else if (apiKey) headers[headerName] = apiKey;

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    productsPath: process.env.BACKEND_PRODUCTS_PATH || "/products",
    headers,
  };
}

async function restRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const config = restConfig();
  const response = await fetch(config.baseUrl + path, {
    ...init,
    headers: { ...config.headers, ...(init?.headers || {}) },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Backend request failed (" + response.status + ").");
  }

  return response.json() as Promise<T>;
}

async function getRestProducts() {
  const config = restConfig();
  const data = await restRequest<{ products?: Product[] } | Product[]>(config.productsPath);
  return Array.isArray(data) ? data : data.products || [];
}

async function createRestProduct(input: Omit<Product, "id">) {
  const config = restConfig();
  const data = await restRequest<{ product?: Product } | Product>(config.productsPath, {
    method: "POST",
    body: JSON.stringify(input),
  });
  return "product" in data ? data.product as Product : data;
}

export async function getProducts(): Promise<Product[]> {
  const mode = provider();

  if (mode === "demo") return demoProducts;

  if (mode === "firebase") {
    const db = getFirebaseDb();
    if (!db) return demoProducts;
    const snapshot = await db.collection("products").orderBy("createdAt", "desc").get();
    if (snapshot.empty) return demoProducts;
    return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, "id">) }));
  }

  return getRestProducts();
}

export async function createProduct(input: Omit<Product, "id">) {
  const mode = provider();
  if (mode === "firebase") {
    const db = getFirebaseDb();
    if (!db) throw new Error("Firebase Admin is not configured.");
    const ref = db.collection("products").doc();
    await ref.set({ ...input, createdAt: Date.now(), updatedAt: Date.now() });
    return { id: ref.id, ...input };
  }

  if (mode === "rest") return createRestProduct(input);

  throw new Error("Demo Mode is read-only. Configure BACKEND_PROVIDER=firebase or rest to manage products.");
}

export async function updateProduct(id: string, input: Partial<Omit<Product, "id">>) {
  const mode = provider();

  if (mode === "firebase") {
    const db = getFirebaseDb();
    if (!db) throw new Error("Firebase Admin is not configured.");
    const ref = db.collection("products").doc(id);
    await ref.set({ ...input, updatedAt: Date.now() }, { merge: true });
    const snapshot = await ref.get();
    return { id: snapshot.id, ...(snapshot.data() as Omit<Product, "id">) };
  }

  if (mode === "rest") {
    const config = restConfig();
    const data = await restRequest<{ product?: Product } | Product>(config.productsPath + "/" + encodeURIComponent(id), {
      method: "PUT",
      body: JSON.stringify(input),
    });
    return "product" in data ? data.product as Product : data;
  }

  throw new Error("Demo Mode is read-only. Configure a backend to edit products.");
}

export async function deleteProduct(id: string) {
  const mode = provider();

  if (mode === "firebase") {
    const db = getFirebaseDb();
    if (!db) throw new Error("Firebase Admin is not configured.");
    await db.collection("products").doc(id).delete();
    return;
  }

  if (mode === "rest") {
    const config = restConfig();
    await restRequest(config.productsPath + "/" + encodeURIComponent(id), { method: "DELETE" });
    return;
  }

  throw new Error("Demo Mode is read-only. Configure a backend to delete products.");
}

export { provider as getBackendProvider };
