"use client";

import React, { useEffect, useState } from "react";
import { Category } from "../types/category";
import { getCategories } from "../lib/getCategories";

const CategorySelector = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  return (
    <ul>
      {categories.map((category) => {
        return (
          <li key={category._id}>
            <button>{category.title}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default CategorySelector;
