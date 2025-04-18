import React from "react";
import { PortableText } from "next-sanity";

//Types
import { Product } from "@/shared/types/product";

//Styles
import styles from "./ProductSpecifications.module.scss";

interface ProductDescriptionProps {
  product: Product;
}

const ProductSpecifications: React.FC<ProductDescriptionProps> = ({
  product,
}) => {
  return (
    <div className={styles.productSpecification}>
      <PortableText value={product.specification} />
    </div>
  );
};

export default ProductSpecifications;
