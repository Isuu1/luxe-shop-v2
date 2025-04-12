"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useState } from "react";

//Styles
import styles from "./ProductImages.module.scss";
//Types
import { Product } from "@/shared/types/product";

interface ProductImagesProps {
  product: Product;
}

const ProductImages: React.FC<ProductImagesProps> = ({ product }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className={styles.productPageImages}>
      <Image
        src={urlFor(product.images && product.images[imageIndex]).toString()}
        alt=""
        fill
        className={styles.mainImage}
      />
      <div className={styles.imageSlides}>
        {product.images.map((item, index) => (
          <Image
            src={urlFor(item).toString()}
            alt=""
            fill
            className={`${styles.slide} ${
              index === imageIndex ? styles.activeSlide : ""
            }`}
            onMouseEnter={() => setImageIndex(index)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
