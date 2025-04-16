export type Order = {
  created_at: string;
  customer_email: string;
  order_id: string;
  total_amount: number;
  user_id: string;
  items: OrderItem[];
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
