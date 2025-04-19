"use client";

import React, { useEffect, useRef, useState } from "react";

//Animations
import { motion } from "framer-motion";
//Styles
import styles from "./Search.module.scss";
//Icons
import { RiSearchLine } from "react-icons/ri";
//Utils
import { getProducts } from "@/features/products/lib/getProducts";
//Types
import { Product } from "@/shared/types/product";
//Components
import SearchItem from "./SearchItem";

export const searchBarVariants = {
  hidden: {
    y: -100,
  },
  visible: {
    y: 0,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
  exit: {
    y: -100,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
};

interface SearchProps {
  closeSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ closeSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [matchingProducts, setMatchingProducts] = useState<Product[]>([]);

  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setMatchingProducts([]);
        setSearchQuery(null); // Clear the search query
        closeSearch(); // Call the closeSearch function when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSearch]);

  //Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (!data || data.length === 0) {
          setError("Failed to fetch products. Please try again later.");
          return;
        }
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field when the component mounts
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    const matchingProducts = products.filter((product) => {
      return product.name
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(value));
    });
    setMatchingProducts(matchingProducts);
  };

  const handleInputClear = () => {
    setSearchQuery(null);
    setMatchingProducts([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <motion.div
      ref={searchContainerRef}
      className={styles.search}
      variants={searchBarVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <div className={styles.inputContainer}>
        <label className={styles.label}>search</label>
        <input
          className={styles.input}
          autoComplete="off"
          ref={inputRef}
          id="search"
          type="text"
          onChange={handleInputChange}
        />
        <span className={styles.icon}>
          <RiSearchLine />
        </span>
        {searchQuery && (
          <button className={styles.clearButton} onClick={handleInputClear}>
            Clear
          </button>
        )}
      </div>

      {searchQuery && (
        <ul className={styles.results}>
          {error && <p className={styles.error}>{error}</p>}
          {!error && (
            <p className={styles.resultsCount}>
              {`${matchingProducts.length} ${
                matchingProducts.length === 1 ? "result for" : "results for"
              } `}
              <span className="bold">{searchQuery}</span>
            </p>
          )}
          {matchingProducts.length > 0 &&
            matchingProducts.map((item) => (
              <SearchItem
                key={item._id}
                product={item}
                closeSearch={closeSearch}
                onProductClick={() => setSearchQuery(null)}
              />
            ))}
          {matchingProducts.length === 0 && !error && (
            <p className={styles.noResults}>
              No products found matching your search criteria
            </p>
          )}
        </ul>
      )}
    </motion.div>
  );
};

export default Search;
