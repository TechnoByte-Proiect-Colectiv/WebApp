import apiClient from './apiClient';

const REVIEW_ENDPOINT = '/api/review';

export const ReviewService = {
    // get user reviews
    getMyReviews: async () => {
        const response = await apiClient.get(`${REVIEW_ENDPOINT}/my-reviews`);
        return response.data;
    },

    // add or edit review
    saveReview: async (review: any) => {
        const reviewPayload = {
            productId: Number(review.productId),
            rating: review.rating,
            title: review.title,
            description: review.description,
            verifiedPurchase: true,
            created_at: new Date().toISOString().split('T')[0] 
        };

        const response = await apiClient.post(REVIEW_ENDPOINT, reviewPayload);
        return response.data;
    },

    // delete review
    deleteReview: async (productId: number) => {
        console.log(`Deleting review for product: ${productId}`);
        await apiClient.delete(`${REVIEW_ENDPOINT}/${productId}`);
    }
};