import Button from "@/shared/components/ui/Button";
import Link from "next/link";

export default function Page() {
  return (
    <div
      className="page"
      style={{
        fontSize: "1rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Payment Successful!</h2>
      <p>Thank you for your order.</p>
      <p>
        Your order details are being processed and saved. You`ll receive
        confirmation shortly.
      </p>
      <br />
      <Link href="/user/orders">
        <Button variant="secondary" type="button" text="Your Orders" />
      </Link>
      <br />
      <Link href="/">
        <Button text="Continue Shopping" type="button" variant="primary" />
      </Link>
    </div>
  );
}
