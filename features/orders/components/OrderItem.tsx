"use client";

import React from "react";

//Styles
import styles from "./OrderItem.module.scss";
import { Order } from "@/shared/types/order";
//Icons
import { IoIosArrowDown } from "react-icons/io";
//Animations
import { AnimatePresence } from "framer-motion";
//Components
import OrderDetails from "./OrderDetails";

interface OrderItemProps {
  order: Order;
  isExpanded?: boolean;
  onToggleExpand?: (orderId: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <div className={styles.orderItem} key={order.order_id}>
      <div className={`${styles.summary} ${isExpanded ? styles.active : ""}`}>
        <p>{order.order_number}</p>
        <p>
          {new Date(order.created_at).toLocaleString("en-GB", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
        <p>{order.items.length}</p>
        <p>£{order.total_amount / 100}</p>
        <p className={styles.status}>{order.order_status}</p>
        <i
          className={styles.actionIcon}
          onClick={() => onToggleExpand && onToggleExpand(order.order_id)}
        >
          <IoIosArrowDown />
        </i>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && <OrderDetails order={order} />}
      </AnimatePresence>
    </div>
  );
};

export default OrderItem;
