import Image from "next/image";
import React from "react";

//Utils
import { urlFor } from "@/sanity/lib/image";
//Styles
import styles from "./CartItem.module.scss";
//Icons
import { FaMinusSquare } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
//Components
import Button from "@/shared/components/ui/Button";
//Providers
import { useCartContext } from "@/shared/providers/CartProvider";
//Types
import { Product } from "@/shared/types/product";
//Animations
import { motion } from "framer-motion";

interface CartItemProps {
  item: Product;
}

const cartItemVariants = {
  exit: {
    x: 500,
    transition: {
      duration: 0.2,
    },
  },
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  console.log("item", item);

  const { updateCartItemQuantity, removeCartItem } = useCartContext();
  return (
    <motion.div
      className={styles.cartItem}
      variants={cartItemVariants}
      exit="exit"
    >
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
            disabled={item.quantity <= 1}
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

      <MdRemoveShoppingCart
        className={styles.removeButton}
        onClick={() => removeCartItem(item._id)}
      />
    </motion.div>
  );
};

export default CartItem;
