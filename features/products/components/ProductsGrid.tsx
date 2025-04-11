import React from "react";
import CategorySelector from "./CategorySelector";
// Styles
import styles from "@/features/products/components/ProductsGrid.module.scss";

const ProductsGrid = () => {
  return (
    <div className={styles.productsGrid}>
      <CategorySelector />
      ProductsGrid
    </div>
  );
};

export default ProductsGrid;
