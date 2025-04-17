"use client";

import React, { useState } from "react";

//Styles
import styles from "./OrderItem.module.scss";
import { Order } from "@/shared/types/order";
//Icons
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
//Animations
import { motion } from "framer-motion";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div className={styles.orderItem} key={order.order_id}>
      <p>#34567</p>
      <p>
        {new Date(order.created_at).toLocaleString("en-GB", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <p>{order.items.length}</p>
      <p>£{order.total_amount / 100}</p>
      <p className={styles.status}>Fullfilled</p>
      <i
        className={styles.actionIcon}
        onClick={() => setShowDetails(!showDetails)}
      >
        <IoIosArrowDown />
      </i>
      {showDetails && (
        <div className={styles.items}>
          {order.items.map((item) => (
            <div className={styles.item} key={item.price.unit_amount}>
              <strong>{item.description}</strong>
              <Image
                src={item.price.product.images[0]}
                width={100}
                height={100}
                alt=""
              />
              <p>Each: £{item.price.unit_amount / 100}</p>
              <p>{item.quantity}</p>
              <p>Total: £{item.amount_total / 100}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrderItem;
