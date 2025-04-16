"use client";

import React, { useState } from "react";

//Styles
import styles from "./Checkout.module.scss";
//Components
import Button from "@/shared/components/ui/Button";
import LoadingIcon from "@/shared/components/LoadingIcon";
//Providers
import { useCartContext } from "@/shared/providers/CartProvider";
//Utils
import { calculateAllQuantities, calculateTotalPrice } from "../lib/utils";
//Icons
import { IoSend } from "react-icons/io5";
//Actions
import { createCheckoutSession } from "../lib/actions/createCheckoutSession";
//Stripe
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = () => {
  const { cartItems } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = calculateTotalPrice(cartItems);

  const totalQuantities = calculateAllQuantities(cartItems);

  const handleCheckout = async () => {
    setIsLoading(true);
    // Prepare data for Server Action: ONLY IDs and Quantities
    const itemsForServer: { productId: string; quantity: number }[] =
      cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

    try {
      const result = await createCheckoutSession(itemsForServer);
      console.log("result", result);

      if (result.success && result.sessionId) {
        const stripe = await stripePromise;
        if (!stripe) {
          console.error("Stripe.js has not loaded yet.");
          return;
        }
        const { error } = await stripe.redirectToCheckout({
          sessionId: result.sessionId,
        });
        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
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
        icon={isLoading ? <LoadingIcon /> : <IoSend />}
        text="Proceed to checkout"
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
      />
    </div>
  );
};

export default Checkout;
