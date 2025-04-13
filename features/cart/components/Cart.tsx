"use client";

import React, { useRef } from "react";

//Animations
import { motion } from "framer-motion";
//Styles
import styles from "./Cart.module.scss";
//Icons
import { IoIosClose } from "react-icons/io";
//import { IoSend } from "react-icons/io5";
import { useCartContext } from "@/shared/providers/CartProvider";

const Cart = () => {
  const cartRef = useRef(null);
  const { setShowCart } = useCartContext();
  return (
    <motion.div
      className={styles.cart}
      ref={cartRef}
      animate="visible"
      initial="hidden"
      exit="exit"
      //variants={cartSlide}
    >
      <div className="cart-container__header">
        <h2 className="cart-container__header__headline">Your cart</h2>
        <button
          className="cart-container__header__close-button"
          onClick={() => setShowCart(false)}
        >
          <IoIosClose />
        </button>
      </div>
      <div className="cart-container__products_wrapper">
        {/* <AnimatePresence>
          {cartItems.length > 0 ? (
            cartItems?.map((item, index) => (
              <CartItem key={item._id} item={item} />
            ))
          ) : (
            <div className="cart-container__empty-basket-msg">
              <h2>No items yet</h2>
            </div>
          )}
        </AnimatePresence> */}
      </div>
      {/* <div className="cart-container__footer">
        <h2 className="cart-container__footer__total-price">Total: </h2>
        <h2>£{totalPrice}</h2>
        <button
          className="cart-container__footer__pay-btn"
          onClick={handleCheckout}
        >
          Proceed to checkout
          <IoSend style={{ fontSize: "1.2rem" }} />
        </button>
      </div> */}
    </motion.div>
  );
};

export default Cart;
