"use client";

import React from "react";

//Styles
import styles from "./Checkout.module.scss";
//Components
import Button from "@/shared/components/ui/Button";
//Providers
import { useCartContext } from "@/shared/providers/CartProvider";
//Utils
import { calculateAllQuantities, calculateTotalPrice } from "../lib/utils";
//Icons
import { IoSend } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../lib/actions/createCheckoutSession";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = () => {
  const { cartItems } = useCartContext();

  const totalPrice = calculateTotalPrice(cartItems);

  const totalQuantities = calculateAllQuantities(cartItems);

  console.log("stripePromise", stripePromise);

  const handleCheckout = async () => {
    // Prepare data for Server Action: ONLY IDs and Quantities
    const itemsForServer: { productId: string; quantity: number }[] =
      cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

    try {
      const result = await createCheckoutSession(itemsForServer);
      console.log("result", result);
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.totalPrice}>
        <p>Total:</p>
        <p>£{totalPrice}</p>
        <p>({totalQuantities} items)</p>
      </div>
      <Button
        className={styles.checkoutButton}
        variant="primary"
        icon={<IoSend />}
        text="Proceed to checkout"
        type="button"
        onClick={handleCheckout}
      />
    </div>
  );
};

export default Checkout;
