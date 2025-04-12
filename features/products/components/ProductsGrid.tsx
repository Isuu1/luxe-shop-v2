"use client";

import React, { useEffect, useState } from "react";

//Components
import CategorySelector from "./CategorySelector";
import ProductCard from "./ProductCard";
import SortingOptions from "./SortingOptions";
// Styles
import styles from "@/features/products/components/ProductsGrid.module.scss";
//Animations
import { AnimatePresence } from "framer-motion";
//Types
import { Product } from "@/shared/types/product";

interface ProductsGridProps {
  products: Product[]; // Replace 'any' with the actual type of your product data
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortingOption, setSortingOption] = useState("Relevance");
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
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortingOption) {
        case "PriceLowToHigh":
          return a.price - b.price;
        case "PriceHighToLow":
          return b.price - a.price;
        case "RatingLowToHigh":
          return a.stars - b.stars;
        case "RatingHighToLow":
          return b.stars - a.stars;
        case "Relevance":
        default:
          return 0; // No sorting
      }
    });
    // Update the state with the filtered list, triggering a re-render
    setDisplayedProducts(sortedProducts);
  }, [activeCategory, products, sortingOption]);

  return (
    <div className={styles.productsGrid}>
      <div className="flex-row">
        <SortingOptions setSortingOption={setSortingOption} />
        <CategorySelector
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <div className={styles.products}>
        <AnimatePresence mode="wait">
          {displayedProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsGrid;
