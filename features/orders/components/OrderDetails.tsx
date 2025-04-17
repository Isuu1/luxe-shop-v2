import React from "react";
import Image from "next/image";

//Animations
import { motion } from "framer-motion";
//Styles
import styles from "./OrderDetails.module.scss";
//Types
import { Order } from "@/shared/types/order";

const orderDetailsContainerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  console.log("order", order);
  return (
    <motion.div
      className={styles.orderDetailsContainer}
      variants={orderDetailsContainerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className={styles.items}>
        {order.items.map((item) => (
          <div className={styles.item} key={item.price.unit_amount}>
            <div className="flex-row">
              <Image
                className={styles.image}
                src={item.price.product.images[0]}
                width={100}
                height={100}
                alt=""
              />
              <div className="flex-col">
                <strong>{item.description}</strong>
                <p>
                  £{item.price.unit_amount / 100} / <em>each</em>
                </p>
              </div>
            </div>
            <div className="flex-col">
              <p>Qty: {item.quantity}</p>
              <strong>£{item.amount_total / 100}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summaryContainer}>
        <h3>Order summary</h3>
        <div className={styles.innerWrapper}>
          <div className={styles.costs}>
            <div className={styles.item}>
              <p>Subtotal</p>
              <p>£{order.total_amount / 100}</p>
            </div>
            <div className={styles.item}>
              <p>Discount</p>
              <p>£0</p>
            </div>
            <div className={styles.item}>
              <p>Delivery</p>
              <p>£0</p>
            </div>
            <div className={styles.item}>
              <p>Total</p>
              <strong>£{order.total_amount / 100}</strong>
            </div>
          </div>
          <div className={styles.details}>
            <p>Delivery</p>
            <p>40 Radmore Road</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
