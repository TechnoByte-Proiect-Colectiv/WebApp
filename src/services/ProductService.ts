import { ProductType } from "../types/product/product";
import { Review } from "../types/product/review";
import apiClient from "./apiClient";

const ENDPOINT = "/api";

export const ProductService = {
  // get all products
  getAll: async (): Promise<ProductType[]> => {
    const response = await apiClient.get(`${ENDPOINT}/product`);
    
    let pt: ProductType[] = response.data;

    // Logica ta de mapare imagine ramane
    pt.map((p) => p.image = "data:image/png;base64," + p.fileData);

    return pt;
  },

  getRandom: async (count: number): Promise<ProductType[]> => {
    const response = await apiClient.get(`${ENDPOINT}/product`);
    
    const products = response.data;
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  // get a product by ID
  getById: async (id: number): Promise<ProductType> => {
    const response = await apiClient.get(`${ENDPOINT}/product/${id}`);
    
    let p: ProductType = response.data;
    p.image = "data:image/png;base64," + p.fileData;

    return p;
  },

  getReviewsForProduct: async (id: number): Promise<Review[]> => {
    const response = await apiClient.get(`${ENDPOINT}/review/product/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<ProductType> => {
    const response = await apiClient.get(`${ENDPOINT}/product/${slug}`);
    
    let p: ProductType = response.data;
    p.image = "data:image/png;base64," + p.fileData;

    return p;
  },

  // create a product
  createProduct: async (product: ProductType): Promise<ProductType> => {
    const response = await apiClient.post(`${ENDPOINT}/products`, product);
    return response.data;
  },

  // update a product
  updateProduct: async (product: ProductType): Promise<ProductType> => {
    const response = await apiClient.put(`${ENDPOINT}/products/${product.id}`, product);
    return response.data;
  },

  // delete a product
  deleteProduct: async (productId: number): Promise<void> => {
    await apiClient.delete(`${ENDPOINT}/products/${productId}`);
  },

  // create a review
  createReview: async (productId: number, review: Review): Promise<Review> => {
    const response = await apiClient.post(`${ENDPOINT}/products/${productId}/reviews`, review);
    return response.data;
  },

  // update a review
  updateReview: async (productId: number, review: Review): Promise<Review> => {
    const response = await apiClient.put(`${ENDPOINT}/products/${productId}/reviews/${review.id}`, review);
    return response.data;
  },

  // delete a review
  deleteReview: async (reviewId: number): Promise<void> => {
    await apiClient.delete(`${ENDPOINT}/reviews/${reviewId}`);
  },
};
