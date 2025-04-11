"use client";

import React from "react";
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
  //const [activeCategory, setActiveCategory] = useState<string>("All");
  console.log("products", products);
  //console.log("activeCategory", activeCategory);

  // const sortedProductsByCategory = products.filter((product) => {
  //   if (activeCategory === "All") return true;
  //   return product.category === activeCategory;
  // });

  return (
    <div className={styles.productsGrid}>
      <CategorySelector />
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductsGrid;
