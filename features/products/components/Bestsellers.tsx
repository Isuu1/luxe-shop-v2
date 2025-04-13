"use client";

import { Product } from "@/shared/types/product";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "./ProductCard";

//Styles
import styles from "@/features/products/components/Bestsellers.module.scss";

interface BestsellersProps {
  products: Product[];
}

const Bestsellers: React.FC<BestsellersProps> = ({ products }) => {
  const bestsellers = products.filter((product) => product.stars >= 4);

  const [emblaRef] = useEmblaCarousel(
    {
      dragFree: true,
      loop: true,
    },
    [
      Autoplay({
        delay: 3000,
      }),
    ]
  );

  return (
    <div className={styles.bestsellers} ref={emblaRef}>
      <div className={styles.container}>
        {bestsellers.map((product) => (
          <div key={product._id} className={styles.item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;
