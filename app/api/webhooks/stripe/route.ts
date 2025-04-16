import { stripe } from "@/shared/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface CheckoutSessionMetadata {
  userId: string;
}

interface FulfillOrderResponse {
  success: boolean;
  error: string | null;
}

async function fulfillOrder(
  session: Stripe.Checkout.Session
): Promise<FulfillOrderResponse> {
  //Create a Supabase admin client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return {
      success: false,
      error: "Supabase URL or Service Key is not defined.",
    };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  //Grab metadata passed from createCheckoutSession to get userId
  const metadata = session.metadata as CheckoutSessionMetadata | null;

  const userIdOrGuest =
    metadata?.userId && metadata.userId !== "" ? metadata.userId : null;
  const customerEmail = session.customer_details?.email;

  //Retrieve line items from Stripe Checkout Session
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });

  if (!lineItems || lineItems.data.length === 0) {
    console.error("No line items found for this session:", session.id);
    return {
      success: false,
      error: "No line items found for this session.",
    };
  }

  //Update the order status in your database
  const { error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userIdOrGuest,
      order_id: session.id,
      total_amount: session.amount_total,
      customer_email: customerEmail,
      items: lineItems.data,
    })
    .select()
    .single();

  if (orderError) {
    console.error("Error fetching order:", orderError);
    return {
      success: false,
      error: orderError.message,
    };
  }
  console.log("Order fulfilled successfully:", lineItems);
  return {
    success: true,
    error: null,
  };
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const resolvedHeaders = await headers();
  const signature = resolvedHeaders.get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.log("Error constructing webhook event:", err);
    return NextResponse.json("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(
        `🔔 Received checkout.session.completed for session: ${session.id}`
      );
      try {
        await fulfillOrder(session);
        console.log(
          `✅ Successfully processed checkout.session.completed for ${session.id}`
        );
      } catch (fulfillmentError) {
        console.error(
          `🚨 Fulfillment Error for session ${session.id}:`,
          fulfillmentError
        );
        return NextResponse.json(
          {
            error: "Webhook handler failed.",
            message: fulfillmentError,
          },
          { status: 500 }
        );
      }
      break;
    default:
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
