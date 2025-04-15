"use client";

import React from "react";
//Components
import ProductCard from "@/features/products/components/ProductCard";
//Providers
import { useWishlist } from "@/shared/providers/WishlistProvider";
//Styles
import styles from "./WishlistGrid.module.scss";

const WishlistGrid = () => {
  const { wishlist } = useWishlist();

  return (
    <div className={styles.wishlistGrid}>
      {wishlist.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default WishlistGrid;
