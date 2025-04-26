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

  return wishlist.length === 0 ? (
    <div className={styles.emptyWishlist}>
      <h2>Your wishlist is empty</h2>
      <p>Add products to your wishlist to see them here.</p>
    </div>
  ) : (
    <div className={styles.wishlistGrid}>
      {wishlist.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default WishlistGrid;
