import { Order } from "@/shared/types/order";
import { createClient } from "@/supabase/server";
import React from "react";

//Styles
import styles from "./OrdersGrid.module.scss";

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
      </div>
      {data.map((order: Order) => (
        <div className={styles.order} key={order.order_id}>
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
          {/* <div className={styles.items}>
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
          </div> */}
          <div className={styles.summary}></div>

          {/* <p>Email: {order.customer_email}</p> */}
        </div>
      ))}
    </div>
  );
};

export default OrdersGrid;
