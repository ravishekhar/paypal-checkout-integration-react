export interface ProductItem {
  sku: string;
  name: string;
  description: string;
  price: string; // Price is represented as string to avoid floating point issues
  category: "PHYSICAL_GOODS" | "DIGITAL_GOODS";
  stock: number;
  image: string;
}
export interface Catalog {
  [key: string]: ProductItem;
}
