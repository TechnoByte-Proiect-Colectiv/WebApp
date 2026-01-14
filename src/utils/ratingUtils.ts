import { Review } from "../types/product/review";

export const calculateAverageRating = (reviews: Review[] | undefined | null): number => {
  if (!reviews || reviews.length === 0) return 0;
  
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};