"use client";

import React, { useState } from "react";

//Styles
import styles from "./ProductCardOverlay.module.scss";
//Icons
import { FaBagShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

//Providers
import { useCartContext } from "@/shared/providers/CartProvider";
//Types
import { Product } from "@/shared/types/product";
//Actions
import { addToWishlist } from "@/features/wishlist/lib/actions/addToWishlist";
//Animations
import { AnimatePresence, motion } from "framer-motion";
import { useWishlist } from "@/shared/providers/WishlistProvider";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toast";
import { useAuth } from "@/shared/providers/AuthProvider";
import LoginPrompt from "@/shared/components/LoginPrompt";

interface ProductCardOverlayProps {
  product: Product;
}

const ProductCardOverlay: React.FC<ProductCardOverlayProps> = ({ product }) => {
  const { addToCart } = useCartContext();

  const { user } = useAuth();

  const { wishlist, fetchWishlist } = useWishlist();

  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  const isProductInWishlist = wishlist?.some(
    (item: Product) => item._id === product._id
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleOpenLoginPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLoginPromptOpen(true);
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const result = await addToWishlist(product);
    if (result?.success) {
      fetchWishlist(); // Refresh the wishlist after adding/removing a product
      toast.success(
        isProductInWishlist
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist`,
        toastStyle
      );
    }

    console.log("Result from addToWishlist:", result);
  };

  return (
    <>
      <AnimatePresence>
        {loginPromptOpen && (
          <LoginPrompt onClose={() => setLoginPromptOpen(false)} />
        )}
      </AnimatePresence>
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
          onClick={user ? handleAddToWishlist : handleOpenLoginPrompt}
        >
          {isProductInWishlist ? (
            <FaHeart className={styles.wishlist} />
          ) : (
            <FaRegHeart />
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ProductCardOverlay;
