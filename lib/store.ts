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
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });

  return getFirestore(adminApp);
}

export async function getProducts(): Promise<Product[]> {
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
  const db = getAdminFirestore();
  if (!db) throw new Error("Firebase Admin is not configured.");
  const ref = db.collection("products").doc();
  await ref.set({ ...input, createdAt: Date.now(), updatedAt: Date.now() });
  return { id: ref.id, ...input };
}

export async function updateProduct(id: string, input: Partial<Omit<Product, "id">>) {
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
  const db = getAdminFirestore();
  if (!db) throw new Error("Firebase Admin is not configured.");
  await db.collection("products").doc(id).delete();
}
