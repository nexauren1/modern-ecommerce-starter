export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  image: string;
  badge?: string;
  rating: number;
};

export const products: Product[] = [
  {
    id: "aurora-headphones",
    name: "Aurora Wireless Headphones",
    category: "Audio",
    price: 129,
    compareAtPrice: 159,
    description: "Comfortable wireless headphones with active noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    badge: "Best seller",
    rating: 4.9
  },
  {
    id: "orbit-watch",
    name: "Orbit Smart Watch",
    category: "Wearables",
    price: 189,
    compareAtPrice: 219,
    description: "A modern smartwatch for everyday tracking and notifications.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    rating: 4.8
  },
  {
    id: "terra-bottle",
    name: "Terra Steel Bottle",
    category: "Lifestyle",
    price: 34,
    description: "Double-wall insulated bottle designed for daily carry.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
    rating: 4.7
  },
  {
    id: "studio-lamp",
    name: "Studio Desk Lamp",
    category: "Home",
    price: 78,
    compareAtPrice: 95,
    description: "Minimal adjustable lighting for focused work and creative spaces.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    rating: 4.8
  }
];

export const categories = [
  { name: "Audio", count: 18, accent: "01" },
  { name: "Wearables", count: 12, accent: "02" },
  { name: "Lifestyle", count: 26, accent: "03" },
  { name: "Home", count: 21, accent: "04" }
];
