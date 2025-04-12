import React from "react";
import Image from "next/image";

//Animations
import { motion } from "framer-motion";
//Styles
import styles from "@/features/products/components/ProductCard.module.scss";
//Utils
import { urlFor } from "@/sanity/lib/image";
//Types
import { Product } from "@/shared/types/product";
//Icons
import { FaStar } from "react-icons/fa";

export const productCardAnimation = {
  visible: {
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      key={product._id}
      className={styles.productCard}
      variants={productCardAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Image
        className={styles.image}
        src={urlFor(product.images && product.images[0]).toString()}
        fill
        alt=""
        priority={true}
      />
      <div className="flex-row-space-between">
        <div className={styles.details}>
          <p className={styles.price}>£{product.price}</p>
          <p>{product.name}</p>
        </div>
        <div className={styles.rating}>
          <FaStar className={styles.icon} />
          <span className={styles.number}>{product.stars}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
