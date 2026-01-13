import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProductType } from "../types/product/product";

interface ProductsContextType {
  mockProducts: ProductType[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [mockProducts, setMockProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  }, []);

  return (
    <ProductsContext.Provider value={{ mockProducts, searchTerm, setSearchTerm }}>
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