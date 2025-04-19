import { Product } from "@/shared/types/product";
import React from "react";

//Styles
import styles from "./SearchItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/shared/components/ui/Button";

interface SearchItemProps {
  product: Product;
}

const SearchItem: React.FC<SearchItemProps> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.slug.current}`}
      className={styles.searchItem}
    >
      <Image
        src={urlFor(product.images[0]).toString()}
        className={styles.thumbnail}
        alt=""
        fill
      />
      <div className={styles.details}>
        <h3 className="item__details__title">
          {/* {highlightMatch(item.name, searchQuery)} */}
          {product.name}
        </h3>
        <p className="item__details__price">£{product.price}</p>
      </div>
      <div className={styles.buttons}>
        <Button text="Addto Card here" type="button" />
        <Button text="Addto wishlist here" type="button" />
      </div>
      {/* <div className="item__details__buttons">
          <BuyNowButton product={item} />
        </div> */}
    </Link>
  );
};

export default SearchItem;
