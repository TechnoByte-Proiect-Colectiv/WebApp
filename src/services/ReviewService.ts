import axios from 'axios';
import { Review } from '../types/product/review';

const API_URL = 'http://localhost:8080/api/review';

export const ReviewService = {
    // get user reviews
    getMyReviews: async () => {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/my-reviews`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // add or edit review
    saveReview: async (review: any) => {
        const token = localStorage.getItem("authToken");
        
        if (!token || token === "undefined" || token === "null") {
            throw new Error("Nu ești logat sau token-ul a expirat.");
        }

        const cleanToken = token.replace(/"/g, "");

        const reviewPayload = {
            productId: Number(review.productId),
            rating: review.rating,
            title: review.title,
            description: review.description,
            verifiedPurchase: true,
            created_at: new Date().toISOString().split('T')[0] 
        };

        const response = await axios.post(API_URL, reviewPayload, {
            headers: { 
                Authorization: `Bearer ${cleanToken}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    },

    // delete review
    deleteReview: async (productId: number) => {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        
        const cleanToken = token.replace(/"/g, "");

        console.log(`Deleting review for product: ${productId}`);
        
        await axios.delete(`${API_URL}/${productId}`, {
            headers: { Authorization: `Bearer ${cleanToken}` }
        });
    }
};