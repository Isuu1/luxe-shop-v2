import { PortableText } from "next-sanity";
import React from "react";

//Icons
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

//Styles
import styles from "./ProductDescription.module.scss";
import { Product } from "@/shared/types/product";

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const roundedRating = Math.round(product.stars * 2) / 2;

  console.log("product in description", product);

  // Determine the integer and half-star part
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  const renderStars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      //Full star to render
      return <FaStar className={styles.ratingIcon} key={index} />; // Render an filled star
    } else if (index === fullStars && hasHalfStar) {
      return <FaStarHalfAlt className={styles.ratingIcon} key={index} />; // Render a half-filled star
    } else {
      return <FaRegStar className={styles.ratingIcon} key={index} />; // Render an empty star
    }
  });

  return (
    <div className={styles.productDescription}>
      <h2 className={styles.name}>{product.name}</h2>
      <h2 className={styles.price}>£{product.price}</h2>
      <div className={styles.rating}>
        {renderStars}
        <span>{product.ratings}</span>
      </div>
      <div className={styles.description}>
        <PortableText value={product.details} />
      </div>
    </div>
  );
};

export default ProductDescription;
