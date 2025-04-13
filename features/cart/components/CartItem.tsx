import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/shared/types/product";
import Image from "next/image";
import React from "react";
//Styles
import styles from "./CartItem.module.scss";
//Icons
import { FaMinusSquare } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import Button from "@/shared/components/ui/Button";
import { useCartContext } from "@/shared/providers/CartProvider";

interface CartItemProps {
  item: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  console.log("item", item);

  const { updateCartItemQuantity } = useCartContext();
  return (
    <div className={styles.cartItem}>
      <Image
        fill
        src={urlFor(item.images[0]).toString()}
        alt=""
        className={styles.image}
      />
      <div className={styles.details}>
        <h3>{item?.name}</h3>
        <p>£{item?.price}</p>
        <div className={styles.quantity}>
          <Button
            className={`${styles.button} ${item.quantity <= 1 && styles.inactive}`}
            variant="primary"
            icon={<FaMinusSquare />}
            onClick={() => updateCartItemQuantity(item._id, "decrement")}
          />

          <p>{item?.quantity}</p>

          <Button
            className={styles.button}
            variant="primary"
            icon={<FaPlusSquare />}
            onClick={() => updateCartItemQuantity(item._id, "increment")}
          />
        </div>
      </div>

      <MdRemoveShoppingCart className={styles.removeButton} />
    </div>
  );
};

export default CartItem;
