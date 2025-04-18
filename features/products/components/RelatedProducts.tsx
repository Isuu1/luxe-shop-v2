"use client";

import React, { useEffect, useState } from "react";

//Styles
import styles from "@/features/products/components/RelatedProducts.module.scss";
import { Product } from "@/shared/types/product";
import { getProducts } from "../lib/getProducts";
import ProductCard from "./ProductCard";

interface ProductDescriptionProps {
  product: Product;
}

const RelatedProducts: React.FC<ProductDescriptionProps> = ({ product }) => {
  console.log("product in related", product);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const relatedProducts = products.filter((item) => {
    if (item._id === product._id) return false;

    const itemCats = item.categories.filter((cat) => cat.title !== "All");
    const productCats = product.categories.filter((cat) => cat.title !== "All");

    return itemCats.some((cat) =>
      productCats.some((pCat) => pCat.title === cat.title)
    );
  });
  console.log("related", relatedProducts);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className={styles.relatedProducts}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.relatedProducts}>{error}</div>;
  }

  return (
    <div className={styles.relatedProducts}>
      <h2 className={styles.title}>You may also like</h2>
      <div className={styles.relatedProductsContainer}>
        {relatedProducts.map((product) => (
          <div key={product._id} className={styles.item}>
            <ProductCard key={product._id} product={product} />
          </div>
        ))}
        {relatedProducts.length === 0 && (
          <div className={styles.relatedProducts}>
            No related products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
