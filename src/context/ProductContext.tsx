// src/context/ProductsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { generateProducts } from "./mockProducts";
import { ProductType } from "../types/product/product";

interface ProductsContextType {
  mockProducts: ProductType[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [mockProducts, setMockProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const generated = generateProducts(300);
    setMockProducts(generated);
  }, []);

  return (
    <ProductsContext.Provider value={{ mockProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts trebuie folosit în interiorul unui <ProductsProvider>");
  }
  return context;
};
