import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductCartType } from '../types/product/productCart';
import { ProductType } from '../types/product/product';

interface CartContextType {
  cartProducts: ProductCartType[];
  addToCart: (product: ProductType, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  isInCart: (productId: string) => boolean;
  getProductQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<ProductCartType[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addToCart = (product: ProductType, quantity: number = 1) => {
    const existingItem = cartProducts.find((item) => item.product.id === product.id);
    const currentQty = existingItem ? existingItem.quantity : 0;

    if (currentQty + quantity > product.stock) {
      alert(`Can't add more. Maximum stock available: ${product.stock}`);
      return; 
    }

    setCartProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingProductIndex !== -1) {
        return prevProducts.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevProducts, { product, quantity }];
      }
    });
  };

  const removeFromCart = (index: number) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((_, i) => i !== index)
    );
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }

    const targetItem = cartProducts[index];
    
    if (!targetItem) return;

    if (newQuantity > targetItem.product.stock) {
       alert(`Maximum stock available is ${targetItem.product.stock}`);
       setCartProducts((prevProducts) =>
        prevProducts.map((item, i) =>
          i === index ? { ...item, quantity: targetItem.product.stock } : item
        )
      );
      return;
    }

    setCartProducts((prevProducts) =>
      prevProducts.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  const getCartTotal = () => {
    return cartProducts.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartProducts.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: string) => {
    return cartProducts.some((item) => item.product.id === productId);
  };

  const getProductQuantity = (productId: string) => {
    const cartItem = cartProducts.find((item) => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const value: CartContextType = {
    cartProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getProductQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};