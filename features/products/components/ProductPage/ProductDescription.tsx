"use client";

import { PortableText } from "next-sanity";
import React, { useState } from "react";

//Icons
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaMinusSquare } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";

//Styles
import styles from "./ProductDescription.module.scss";
import { Product } from "@/shared/types/product";
import Button from "@/shared/components/ui/Button";
import { useCartContext } from "@/shared/providers/CartProvider";

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const { addToCart } = useCartContext();

  const [quantity, setQuantity] = useState(1);

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
      <div className={styles.addToCart}>
        <div className={styles.quantity}>
          <Button
            className={`${styles.button} ${quantity <= 1 && styles.inactive}`}
            variant="primary"
            icon={<FaMinusSquare />}
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
          />

          <p>{quantity}</p>

          <Button
            className={styles.button}
            variant="primary"
            icon={<FaPlusSquare />}
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
        <Button
          className={styles.addToCartButton}
          variant="primary"
          text="Add to cart"
          icon={<FaBagShopping />}
          onClick={() => addToCart(product, quantity)}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
