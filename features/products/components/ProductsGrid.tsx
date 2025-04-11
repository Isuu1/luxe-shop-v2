"use client";

import React from "react";
import CategorySelector from "./CategorySelector";
// Styles
import styles from "@/features/products/components/ProductsGrid.module.scss";
//import { AnimatePresence } from "framer-motion";
//import { motion } from "framer-motion";

const ProductsGrid = ({ products }) => {
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
      {/* <AnimatePresence mode="popLayout">
          {products.map((product) => (
            // <motion.div
            //   key={product._id}
            //   variants={productAnimation}
            //   initial="hidden"
            //   animate="visible"
            //   exit="exit"
            // >
            //   <Product
            //     product={product}
            //     smallCard={true}
            //     userId={userId}
            //     wishlist={wishlist}
            //   />
            // </motion.div>
          ))}
        </AnimatePresence> */}
    </div>
  );
};

export default ProductsGrid;
