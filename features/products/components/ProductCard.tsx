import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
//Components
import ProductCardOverlay from "./ProductCardOverlay";

export const productCardAnimation = {
  visible: {
    scale: 1,
    transition: {
      duration: 0.2,
      type: "spring",
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
  const router = useRouter();

  return (
    <motion.div
      layout
      className={styles.productCard}
      variants={productCardAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={() => router.push(`/product/${product.slug.current}`)}
    >
      <ProductCardOverlay product={product} />
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
