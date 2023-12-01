export interface Order {
  order_id: string;
  product_id: string;
  user_id: string;
  shipping_address: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  payment_method: string;
  payment_result_id: string;
  payment_result_status: string;
  payment_result_update_time: Date;
  payment_result_email_address: string;
  tax_price: number;
  shippingAddress: number;
  shipping_price: number;
  total_price: number;
  is_paid: number;
  paid_at: Date;
  is_delivered: number;
  delivered_at: Date;
  created_at: Date;
}
