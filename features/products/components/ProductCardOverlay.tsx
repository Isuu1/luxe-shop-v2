"use client";

import React from "react";

//Styles
import styles from "./ProductCardOverlay.module.scss";
//Icons
import { FaBagShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
//Providers
import { useCartContext } from "@/shared/providers/CartProvider";
//Types
import { Product } from "@/shared/types/product";
//Actions
import { addToWishlist } from "@/features/wishlist/lib/actions/addToWishlist";
//Animations
import { motion } from "framer-motion";

interface ProductCardOverlayProps {
  product: Product;
}

const ProductCardOverlay: React.FC<ProductCardOverlayProps> = ({ product }) => {
  const { addToCart } = useCartContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const result = await addToWishlist(product);
    console.log("Result from addToWishlist:", result);
  };

  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.button}
        whileTap={{ scale: 1.6 }}
        onClick={handleAddToCart}
      >
        <FaBagShopping />
      </motion.div>
      <motion.div
        className={styles.button}
        whileTap={{ scale: 1.6 }}
        onClick={handleAddToWishlist}
      >
        <FaRegHeart />
      </motion.div>
    </div>
  );
};

export default ProductCardOverlay;
