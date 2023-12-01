export interface Review {
  review_id: string;
  rating: number;
  comment: string;
  user_id: string;
  product_id: string;
  created_at: Date;
  updated_at: Date;
}
