import { Category } from "./category";

export interface ProductType {
    id: string;
    name: string; // cred ca asta ar fi title
    slug: string;
    description: string;
    price: number;
    currency: string;
    quantity: number;
    // category: Category;
    category: string;
    image: string;
    seller: {
      name: string;
      slug: string;
    };
    specifications: Record<string, string>[];
    rating: number;
    fileData: string;
  }