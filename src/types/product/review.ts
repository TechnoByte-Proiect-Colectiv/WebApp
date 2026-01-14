export interface Review {
    id: string;
    userId: string;
    productId: string;
    postingName?: string;
    avatar?: string;
    title?: string;
    description: string;
    rating: number;
    created_at: string;
    isVerifiedPurchase: boolean;
  }