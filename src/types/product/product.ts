import { Category } from "./category";

export interface ProductType {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    stock: number;
    image: string;
    category: Category;
    seller: {
      name: string;
      slug: string;
    };
    specifications: Record<string, string>[];
    rating: number;
  }