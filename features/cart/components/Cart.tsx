"use client";

import React, { useEffect, useRef } from "react";

//Animations
import { AnimatePresence, motion } from "framer-motion";
//Styles
import styles from "./Cart.module.scss";
//Icons
import { IoIosClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
//Context
import { useCartContext } from "@/shared/providers/CartProvider";
//Components
import Button from "@/shared/components/ui/Button";
import CartItem from "./CartItem";
import { calculateAllQuantities, calculateTotalPrice } from "../lib/utils";

export const cartVariants = {
  visible: {
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    x: 300,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    x: 400,
    transition: {
      duration: 0.2,
    },
  },
};

const emptyCartVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
};

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);

  const { setShowCart, cartItems } = useCartContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };
    //Using pointerdown instead of click makes sure the event is caught before the element disappears
    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [setShowCart]);

  const totalPrice = calculateTotalPrice(cartItems);

  const totalQuantities = calculateAllQuantities(cartItems);

  return (
    <motion.div
      className={styles.cart}
      ref={cartRef}
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={cartVariants}
    >
      <div className={styles.header}>
        <button
          className={styles.closeButton}
          onClick={() => setShowCart(false)}
        >
          <IoIosClose />
        </button>

        <p className={styles.title}>Your cart</p>
        <span></span>
      </div>
      <div className={styles.items}>
        <AnimatePresence>
          {cartItems.length > 0 &&
            cartItems?.map((item) => <CartItem key={item._id} item={item} />)}
          {cartItems.length === 0 && (
            <motion.div
              className={styles.empty}
              variants={emptyCartVariants}
              initial="hidden"
              animate="visible"
            >
              <h2>Your cart is empty</h2>
              <p>Looks like you haven’t added anything yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
        />
      </div>
    </motion.div>
  );
};

export default Cart;
