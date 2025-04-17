"use client";

import React from "react";
import Image from "next/image";

//Styles
import styles from "./OrderItem.module.scss";
import { Order } from "@/shared/types/order";
//Icons
import { IoIosArrowDown } from "react-icons/io";
//Animations
import { AnimatePresence, motion } from "framer-motion";

interface OrderItemProps {
  order: Order;
  isExpanded?: boolean;
  onToggleExpand?: (orderId: string) => void;
}

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

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <motion.div className={styles.orderItem} key={order.order_id}>
      <div className={`${styles.summary} ${isExpanded ? styles.active : ""}`}>
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
          onClick={() => onToggleExpand && onToggleExpand(order.order_id)}
        >
          <IoIosArrowDown />
        </i>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && (
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
                      <p>£{item.price.unit_amount / 100}</p>
                    </div>
                  </div>
                  <div className="flex-col">
                    <p>Qty: {item.quantity}</p>
                    <strong>Total: £{item.amount_total / 100}</strong>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderItem;
