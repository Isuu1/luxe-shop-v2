"use client";

import React, { useEffect, useRef } from "react";

//Animations
import { motion } from "framer-motion";
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

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);

  const { setShowCart, cartItems } = useCartContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setShowCart]);

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  const totalPrice = calculateTotalPrice();

  const calculateAllQuantities = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  const totalQuantities = calculateAllQuantities();

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
        {/* <AnimatePresence> */}
        {cartItems.length > 0 ? (
          cartItems?.map((item) => <CartItem key={item._id} item={item} />)
        ) : (
          <div className="cart-container__empty-basket-msg">
            <h2>No items yet</h2>
          </div>
        )}
        {/* </AnimatePresence> */}
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
