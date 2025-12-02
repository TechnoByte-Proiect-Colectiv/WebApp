export interface Review {
    id: string;
    user_id: string;
    product_id: string;
    postingName: string;
    avatar?: string;
    title?: string;
    comment: string;
    rating: number;
    created_at: string;
    isVerifiedPurchase: boolean;
  }