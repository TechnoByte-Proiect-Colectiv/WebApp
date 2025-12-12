import { ProductType } from "../types/product/product";
import { Review } from "../types/product/review";

const API_URL = 'http://localhost:8080/api'; 

export const ProductService = {
    // get all products
    getAll: async(): Promise<ProductType[]> => {
        const response = await fetch(`${API_URL}/products`);
        if(!response.ok) throw new Error('Failed to fetch products!');
        return response.json();
    },

    // get a product by ID
    getById: async(id: number): Promise<ProductType> => {
        const response = await fetch(`${API_URL}/product/${id}`);
        if(!response.ok) throw new Error('Product not found!');
        return response.json()
    },

    // get reviews for a product
    getReviews: async(productId: number): Promise<Review[]> => {
        const response = await fetch(`${API_URL}/products/${productId}/reviews`);
        if(!response.ok) throw new Error('Failed to fetch reviews!');
        return response.json();
    },

    // create a product
    createProduct: async(product: ProductType, token: string): Promise<ProductType> => {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(product),
        });
        if(!response.ok) throw new Error('Failed to create product!');
        return response.json();
    },

    // update a product
    updateProduct: async(product: ProductType, token: string): Promise<ProductType> => {
        const response = await fetch(`${API_URL}/products/${product.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(product),
        });
        if(!response.ok) throw new Error('Failed to update product!');
        return response.json();
    },

    // delete a product
    deleteProduct: async(productId: number, token: string): Promise<void> => {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if(!response.ok) throw new Error('Failed to delete product!')
    },

    // create a review
    createReview: async(productId: number, review: Review, token: string): Promise<Review> => {
        const response = await fetch(`${API_URL}/products/${productId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(review),
        });
        if(!response.ok) throw new Error('Failed to create review!');
        return response.json();
    },

    // update a review
    updateReview: async(productId: number, review: Review, token: string): Promise<Review> => {
        const response = await fetch(`${API_URL}/products/${productId}/reviews/${review.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(review),
        });
        if(!response.ok) throw new Error('Failed to update review!');
        return response.json();
    },

    // delete a review
    deleteReview: async(reviewId: number, token: string): Promise<void> => {
        const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if(!response.ok) throw new Error('Failed to delete review!');
    }
}