"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

//Styles
import styles from "./SearchItem.module.scss";
import { toastStyle } from "@/shared/styles/toast";
//Types
import { Product } from "@/shared/types/product";
//Utils
import { urlFor } from "@/sanity/lib/image";
//Icons
import { FaBagShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
//Providers
import { useCartContext } from "@/shared/providers/CartProvider";
import { useWishlist } from "@/shared/providers/WishlistProvider";
//Actions
import { addToWishlist } from "@/features/wishlist/lib/actions/addToWishlist";
//Animations
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/shared/providers/AuthProvider";
import LoginPrompt from "@/shared/components/LoginPrompt";

interface SearchItemProps {
  product: Product;
  closeSearch: () => void; // Optional callback for item click
  onProductClick: () => void;
}

const SearchItem: React.FC<SearchItemProps> = ({
  product,
  closeSearch,
  onProductClick,
}) => {
  const { addToCart } = useCartContext();

  const { wishlist, fetchWishlist } = useWishlist();

  const { user } = useAuth();

  const [loginPromptOpen, setLoginPromptOpen] = useState<boolean>(false);

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
  };

  const handleItemClick = () => {
    if (onProductClick) {
      onProductClick();
      closeSearch();
    }
  };

  return (
    <li onClick={handleItemClick} className={styles.searchItemWrapper}>
      <AnimatePresence>
        {loginPromptOpen && (
          <LoginPrompt onClose={() => setLoginPromptOpen(false)} />
        )}
      </AnimatePresence>
      <Link
        href={`/product/${product.slug.current}`}
        className={styles.searchItem}
      >
        <Image
          src={urlFor(product.images[0]).toString()}
          className={styles.thumbnail}
          alt=""
          fill
        />
        <div className={styles.details}>
          <h3 className="item__details__title">{product.name}</h3>
          <p className="item__details__price">£{product.price}</p>
        </div>
        <div className={styles.buttons}>
          <motion.i
            className={styles.icon}
            onClick={handleAddToCart}
            whileTap={{ scale: 1.6 }}
          >
            <FaBagShopping />
          </motion.i>
          <motion.i
            className={styles.icon}
            onClick={user ? handleAddToWishlist : handleOpenLoginPrompt}
            whileTap={{ scale: 1.6 }}
          >
            {isProductInWishlist ? (
              <FaHeart className={styles.wishlistIcon} />
            ) : (
              <FaRegHeart />
            )}
          </motion.i>
        </div>
      </Link>
    </li>
  );
};

export default SearchItem;
