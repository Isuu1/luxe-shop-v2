"use client";

import { Order } from "@/shared/types/order";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";

//Styles
import styles from "./OrdersGrid.module.scss";
import OrderItem from "./OrderItem";

const OrdersGrid = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const handleToggleExpand = (orderId: string) => {
    setExpandedOrderId((prevExpandedId) =>
      prevExpandedId === orderId ? null : orderId
    );
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      try {
        const supabase = createClient();

        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) {
          setError("Error fetching user");
          return;
        }

        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false })
          .limit(10);
        if (error) {
          setError("Error fetching orders");
          return;
        }
        if (data) {
          setOrders(data);
        }
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.ordersGrid}>
        <div className={styles.header}>
          <p>Order No</p>
          <p>Date</p>
          <p>Items</p>
          <p>Amount</p>
          <p>Status</p>
          <p>Details</p>
        </div>
        <div className={styles.loading}>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ordersGrid}>
      <div className={styles.header}>
        <p>Order No</p>
        <p>Date</p>
        <p>Items</p>
        <p>Amount</p>
        <p>Status</p>
        <p>Details</p>
      </div>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {orders.map((order: Order) => (
        <OrderItem
          order={order}
          key={order.order_id}
          isExpanded={expandedOrderId === order.order_id}
          onToggleExpand={handleToggleExpand}
        />
      ))}
    </div>
  );
};

export default OrdersGrid;
