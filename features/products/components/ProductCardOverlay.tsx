"use client";

import React from "react";

//Styles
import styles from "./ProductCardOverlay.module.scss";
//Components
import Button from "@/shared/components/ui/Button";
//Icons
import { FaBagShopping } from "react-icons/fa6";
import { useCartContext } from "@/shared/providers/CartProvider";
import { Product } from "@/shared/types/product";

interface ProductCardOverlayProps {
  product: Product;
}

const ProductCardOverlay: React.FC<ProductCardOverlayProps> = ({ product }) => {
  const { addToCart } = useCartContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };
  return (
    <div className={styles.overlay}>
      <Button
        icon={<FaBagShopping />}
        className={styles.button}
        onClick={handleAddToCart}
      />
    </div>
  );
};

export default ProductCardOverlay;
