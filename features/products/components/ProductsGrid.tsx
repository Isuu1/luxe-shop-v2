"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

//Components
import CategorySelector from "./CategorySelector";
import ProductCard from "./ProductCard";
import SortingOptions from "./SortingOptions";
import Filters from "./Filters";
// Styles
import styles from "@/features/products/components/ProductsGrid.module.scss";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Types
import { Product } from "@/shared/types/product";

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortingOption, setSortingOption] = useState("Relevance");

  // --- Price Filter State ---
  const [minPriceFilter, setMinPriceFilter] = useState<number>(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(1000);

  //Rating Filter State
  const [selectedRating, setSelectedRating] = useState<number[]>([
    5, 4, 3, 2, 1,
  ]);

  const pathname = usePathname();
  const productsPage = pathname === "/products";

  //Calculate Overall Price Range
  const [overallMinPrice, overallMaxPrice] = useMemo(() => {
    if (!products || products.length === 0) {
      return [0, 1000]; // Default range if no products
    }
    const prices = products.map((product) => product.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return [min, max];
  }, [products]); // Recalculate only when original products change

  // Run when the overall range changes (e.g., products load/change)
  useEffect(() => {
    setMinPriceFilter(overallMinPrice);
    setMaxPriceFilter(overallMaxPrice);
  }, [overallMinPrice, overallMaxPrice]);

  //Flter products based on selected filters and sorting
  //Filter by Category
  const filteredByCategory = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }
    return products.filter((product) =>
      product.categories?.some((cat) => cat.title === activeCategory)
    );
  }, [activeCategory, products]);

  //Filter by price
  const filteredByPrice = useMemo(() => {
    return filteredByCategory.filter(
      (product) =>
        product.price >= minPriceFilter && product.price <= maxPriceFilter
    );
  }, [filteredByCategory, minPriceFilter, maxPriceFilter]);

  //Filter by rating
  const filteredByRating = useMemo(() => {
    return filteredByPrice.filter((product) => {
      // Ensure stars property exists before checking
      const rating = product.stars ?? 0;
      return selectedRating.includes(rating);
    });
  }, [filteredByPrice, selectedRating]);

  //Sort products
  const sortedProducts = [...filteredByRating].sort((a, b) => {
    //Ensure stars property exists if sorting by it
    const ratingA = a.stars ?? 0;
    const ratingB = b.stars ?? 0;

    switch (sortingOption) {
      case "PriceLowToHigh":
        return a.price - b.price;
      case "PriceHighToLow":
        return b.price - a.price;
      case "RatingLowToHigh":
        return ratingA - ratingB;
      case "RatingHighToLow":
        return ratingB - ratingA;
      case "Relevance":
      default:
        return 0;
    }
  });

  //Callbacks for Filters Component
  const handlePriceFilterChange = (min: number, max: number) => {
    setMinPriceFilter(min);
    setMaxPriceFilter(max);
  };

  const handleRatingFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rating = parseInt(e.target.value, 10); // Get the rating value from the checkbox
    setSelectedRating((prev) => {
      if (prev.includes(rating)) {
        return prev.filter((r) => r !== rating); // Remove rating if already selected
      } else {
        return [...prev, rating]; // Add rating if not selected
      }
    });
  };

  return (
    <div className={styles.productsGrid}>
      {productsPage && (
        <Filters
          overallMinPrice={overallMinPrice}
          overallMaxPrice={overallMaxPrice}
          currentMinPrice={minPriceFilter}
          currentMaxPrice={maxPriceFilter}
          onRatingChange={handleRatingFilterChange}
          onPriceChange={handlePriceFilterChange}
        />
      )}
      <div className="flex-col">
        <div className="flex-row">
          <SortingOptions setSortingOption={setSortingOption} />
          <CategorySelector
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <motion.div className={styles.products}>
          <AnimatePresence mode="popLayout">
            {sortedProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsGrid;
