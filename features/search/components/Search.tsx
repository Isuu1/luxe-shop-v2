"use client";

import React, { useEffect, useRef, useState } from "react";

//Animations
import { motion } from "framer-motion";
//Styles
import styles from "./Search.module.scss";
//Icons
import { RiSearchLine } from "react-icons/ri";

export const searchBarVariants = {
  hidden: {
    y: -100,
  },
  visible: {
    y: 0,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
  exit: {
    y: -100,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
};

interface SearchProps {
  closeSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ closeSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log("value", value);
  };

  const handleInputClear = () => {
    setSearchQuery(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        closeSearch(); // Call the closeSearch function when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSearch]);

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
            clear
          </button>
        )}
      </div>

      {/* {searchQuery && (
          <p className="mobile-search__results-count">
            {`${matchingProducts.length} ${
              matchingProducts.length === 1
                ? "result for"
                : "results for"
            } `}
            <span className="bold">{searchQuery}</span>
          </p>
        )} */}

      {/* {matchingProducts.length === 0 && searchQuery && (
          <motion.p
            className="mobile-search__not-found"
            variants={opacityAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Could not find products matching your search criteria
          </motion.p>
        )} */}
      {/* {matchingProducts.length !== 0 && (
          <ul className="mobile-search__results">
            {matchingProducts.map((item) => (
              <SearchItem key={item._id} item={item} />
            ))}
          </ul>
        )} */}
    </motion.div>
  );
};

export default Search;
