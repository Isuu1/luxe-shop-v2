export type Order = {
  created_at: string;
  customer_email: string;
  order_id: string;
  total_amount: number;
  user_id: string;
  items: OrderItem[];
  shipping_address_line1: string;
  shipping_address_line2: string;
  shipping_address_city: string;
  shipping_address_postal_code: string;
  order_status: string;
  shipping_name: string;
};

type OrderItem = {
  amount_total: number;
  quantity: number;
  description: string;
  price: {
    unit_amount: number;
    currency: string;
    product: {
      images: string[];
    };
  };
};
