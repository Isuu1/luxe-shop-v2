"use client";

import React, { useEffect, useState } from "react";
import { Category } from "../../../shared/types/category";
import { getCategories } from "../lib/getCategories";
//Styles
import styles from "@/features/products/components/CategorySelector.module.scss";
//Icons
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaHeadphones } from "react-icons/fa";
import { MdOutlineSmartphone } from "react-icons/md";
import { IoMdWatch } from "react-icons/io";
import { FaSliders } from "react-icons/fa6";

interface CategorySelectorProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  //const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(categories);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const generateCategoryIcon = (category: string) => {
    switch (category) {
      case "Electronics":
        return <MdOutlineSmartphone />;
      case "Headphones":
        return <FaHeadphones />;
      case "Smartwatches":
        return <IoMdWatch />;
      case "Accessories":
        return <FaSliders />;
      default:
        return <BiSolidCategoryAlt />;
    }
  };

  if (isLoading) {
    return (
      <div className={styles.categoriesMenu}>
        <li
          className={`${styles.categoryItem} ${styles.categoryItemPlaceholder} `}
        >
          <p>placeholder</p>
        </li>
        <li
          className={`${styles.categoryItem} ${styles.categoryItemPlaceholder} `}
        >
          <p>placeholder</p>
        </li>
        <li
          className={`${styles.categoryItem} ${styles.categoryItemPlaceholder} `}
        >
          <p>placeholder</p>
        </li>
      </div>
    );
  }

  return (
    <ul className={styles.categoriesMenu}>
      {categories.map((category) => {
        return (
          <li
            key={category._id}
            className={`${styles.categoryItem} ${
              activeCategory === category.title ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(category.title)}
          >
            {generateCategoryIcon(category.title)}
            {category.title}
          </li>
        );
      })}
    </ul>
  );
};

export default CategorySelector;
