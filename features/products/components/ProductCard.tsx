import React from "react";

//Animations
import { motion } from "framer-motion";
//Styles
import styles from "@/features/products/components/ProductCard.module.scss";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/shared/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      key={product._id}
      className={styles.productCard}
      //variants={productAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* <Product
                product={product}
                smallCard={true}
                userId={userId}
                wishlist={wishlist}
              /> */}
      <Image
        className={styles.image}
        src={urlFor(product.images && product.images[0]).toString()}
        fill
        alt=""
        priority={true}
      />
      <p>{product.price}</p>
      <p>{product.name}</p>
      <p>{product.stars}</p>
    </motion.div>
  );
};

export default ProductCard;
