"use client";

import React, { useEffect, useState } from "react";
import CategorySelector from "./CategorySelector";
// Styles
import styles from "@/features/products/components/ProductsGrid.module.scss";
import { AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/shared/types/product";
//import { motion } from "framer-motion";

interface ProductsGridProps {
  products: Product[]; // Replace 'any' with the actual type of your product data
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Filter the products based on the active category
    const filteredProducts = products.filter((product) => {
      // If 'All' is selected, include all products
      if (activeCategory === "All") {
        return true;
      }
      // Otherwise, check if the product's categories array includes the active category
      return product.categories.some((cat) => cat.title === activeCategory);
    });

    // Update the state with the filtered list, triggering a re-render
    setDisplayedProducts(filteredProducts);
  }, [activeCategory, products]);

  return (
    <div className={styles.productsGrid}>
      <CategorySelector
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <AnimatePresence mode="popLayout">
        <div className={styles.products}>
          {displayedProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ProductsGrid;
