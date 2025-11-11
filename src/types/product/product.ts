import { Category } from "./category";

export interface ProductType {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    categories: Category[]
  }