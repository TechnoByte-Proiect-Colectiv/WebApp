import { ProductType } from "../types/product/product";
import { Review } from "../types/product/review";

const API_URL = "http://localhost:8080/api";

export const ProductService = {
  // get all products
  getAll: async (): Promise<ProductType[]> => {
    const response = await fetch(`${API_URL}/product`);
    if (!response.ok) throw new Error("Failed to fetch products!");

    let pt: ProductType[];
    pt = await response.json();

    pt.map((p) => p.image = "data:image/png;base64," + p.fileData);

    return pt;
  },

  getRandom: async (count: number): Promise<ProductType[]> => {
    const response = await fetch(`${API_URL}/product`);
    if (!response.ok) throw new Error("Failed to fetch random products!");

    const products = await response.json();
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  // get a product by ID
  getById: async (id: number): Promise<ProductType> => {
    const response = await fetch(`${API_URL}/product/${id}`);
    if (!response.ok) throw new Error("Product not found!");
    let p: ProductType;
    p = await response.json();
    p.image = "data:image/png;base64," + p.fileData;

    return p;
  },

  getReviewsForProduct: async (id: number): Promise<Review[]> => {
    const response = await fetch(`${API_URL}/review/${id}`);
    if(!response.ok) throw new Error("Error receiving reviews for product");
    
    return response.json();
  },

  getBySlug: async (slug: string): Promise<ProductType> => {
    const response = await fetch(`${API_URL}/product/${slug}`);
    if (!response.ok) throw new Error("Product not found!");
    let p: ProductType;
    p = await response.json();
    p.image = "data:image/png;base64," + p.fileData;

    return p;
  },

  // create a product
  createProduct: async (
    product: ProductType,
    token: string
  ): Promise<ProductType> => {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Failed to create product!");
    return response.json();
  },

  // update a product
  updateProduct: async (
    product: ProductType,
    token: string
  ): Promise<ProductType> => {
    const response = await fetch(`${API_URL}/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Failed to update product!");
    return response.json();
  },

  // delete a product
  deleteProduct: async (productId: number, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to delete product!");
  },

  // create a review
  createReview: async (
    productId: number,
    review: Review,
    token: string
  ): Promise<Review> => {
    const response = await fetch(`${API_URL}/products/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error("Failed to create review!");
    return response.json();
  },

  // update a review
  updateReview: async (
    productId: number,
    review: Review,
    token: string
  ): Promise<Review> => {
    const response = await fetch(
      `${API_URL}/products/${productId}/reviews/${review.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      }
    );
    if (!response.ok) throw new Error("Failed to update review!");
    return response.json();
  },

  // delete a review
  deleteReview: async (reviewId: number, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to delete review!");
  },
};
