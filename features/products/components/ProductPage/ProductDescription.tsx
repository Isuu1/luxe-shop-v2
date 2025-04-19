"use client";

import { PortableText } from "next-sanity";
import React, { useState } from "react";
import toast from "react-hot-toast";

//Icons
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaMinusSquare } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
//Animations
import { AnimatePresence, motion } from "framer-motion";
//Styles
import styles from "./ProductDescription.module.scss";
import { toastStyle } from "@/shared/styles/toast";
//Types
import { Product } from "@/shared/types/product";
//Components
import Button from "@/shared/components/ui/Button";
//Providers
import { useCartContext } from "@/shared/providers/CartProvider";
import { useWishlist } from "@/shared/providers/WishlistProvider";
//Actions
import { addToWishlist } from "@/features/wishlist/lib/actions/addToWishlist";
import { useAuth } from "@/shared/providers/AuthProvider";
import LoginPrompt from "@/shared/components/LoginPrompt";

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const { addToCart } = useCartContext();
  const { wishlist, fetchWishlist } = useWishlist();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);

  const [loginPromptOpen, setLoginPromptOpen] = useState<boolean>(false);

  const roundedRating = Math.round(product.stars * 2) / 2;

  // Determine the integer and half-star part
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  const renderStars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      //Full star to render
      return <FaStar className={styles.ratingIcon} key={index} />; // Render an filled star
    } else if (index === fullStars && hasHalfStar) {
      return <FaStarHalfAlt className={styles.ratingIcon} key={index} />; // Render a half-filled star
    } else {
      return <FaRegStar className={styles.ratingIcon} key={index} />; // Render an empty star
    }
  });

  const isProductInWishlist = wishlist?.some(
    (item: Product) => item._id === product._id
  );

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
  };

  return (
    <div className={styles.productDescription}>
      <AnimatePresence>
        {loginPromptOpen && (
          <LoginPrompt onClose={() => setLoginPromptOpen(false)} />
        )}
      </AnimatePresence>
      <h2 className={styles.name}>{product.name}</h2>
      <h2 className={styles.price}>£{product.price}</h2>
      <div className={styles.rating}>
        {renderStars}
        <span>{product.ratings}</span>
      </div>
      <div className={styles.description}>
        <PortableText value={product.details} />
      </div>
      <div className={styles.buttons}>
        <div className={styles.addToCart}>
          <div className={styles.quantity}>
            <Button
              className={`${styles.button} ${quantity <= 1 && styles.inactive}`}
              variant="primary"
              icon={<FaMinusSquare />}
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
              type="button"
            />

            <p>{quantity}</p>

            <Button
              className={styles.button}
              variant="primary"
              icon={<FaPlusSquare />}
              onClick={() => setQuantity(quantity + 1)}
              type="button"
            />
          </div>
          <Button
            className={styles.addToCartButton}
            variant="primary"
            text="Add to cart"
            icon={<FaBagShopping />}
            onClick={() => addToCart(product, quantity)}
            type="button"
          />
        </div>
        <motion.div className={styles.wishlistButton}>
          <motion.div
            className={styles.icon}
            whileTap={{ scale: 1.6 }}
            onClick={user ? handleAddToWishlist : handleOpenLoginPrompt}
          >
            {isProductInWishlist ? (
              <FaHeart className={styles.filled} />
            ) : (
              <FaRegHeart />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDescription;
