import { Product } from "@/shared/types/product";

export const calculateTotalPrice = (cartItems: Product[]) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};

export const calculateAllQuantities = (cartItems: Product[]) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.quantity;
  });
  return total;
};
