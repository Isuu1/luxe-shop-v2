import { Order } from "@/shared/types/order";
import { createClient } from "@/supabase/server";
import React from "react";

//Styles
import styles from "./OrdersGrid.module.scss";
import OrderItem from "./OrderItem";

const OrdersGrid = async () => {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error fetching user:", userError);
    return <div>Error fetching user</div>;
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) {
    console.error("Error fetching orders:", error);
    return <div>Error fetching orders</div>;
  }
  console.log("Fetched orders:", data);
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
      {data.map((order: Order) => (
        <OrderItem order={order} key={order.order_id} />
      ))}
    </div>
  );
};

export default OrdersGrid;
