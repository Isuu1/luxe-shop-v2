"use server";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { stripe } from "@/shared/lib/stripe";
import { createClient } from "@/supabase/server";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Stripe from "stripe";

//Cart item data provided by the client
interface CartItemInput {
  productId: string;
  quantity: number;
}

//Expected product data from Sanity
interface SanityProduct {
  _id: string;
  name: string;
  price: number;
  images: SanityImageSource[];
}

export async function createCheckoutSession(cartItems: CartItemInput[]) {
  try {
    const supabase = await createClient();

    //Get Authenticated User (from Supabase)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Determine userId for metadata - use empty string for guests
    const userIdForMetadata = user ? user.id : ""; // Pass empty string if no user
    const userEmail = user ? user.email : undefined; // Pass email if available

    if (!cartItems || cartItems.length === 0) {
      return { success: false, error: "Cannot checkout with an empty cart." };
    }

    //Fetch Product Data & Validate Prices (from Sanity)
    const productIds = cartItems.map((item) => item.productId);

    const query = `*[_type == "product" && _id in $productIds]{
          _id,
          name,
          price,
          images[]{
            asset->{
              _id,
              url
            }
          }
        }`;

    const sanityProducts = await client.fetch<SanityProduct[]>(query, {
      productIds,
    });

    //Create Stripe Line Items (Using Sanity Prices)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const cartItem of cartItems) {
      const product = sanityProducts.find((p) => p._id === cartItem.productId);

      if (!product) {
        //This check is slightly redundant due to the length check above, but good for clarity
        console.error(
          `Validation Error: Product ${cartItem.productId} was in input but not found in Sanity results.`
        );
        return { error: `Item ${cartItem.productId} is unavailable.` };
      }

      lineItems.push({
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.name,
            images: [urlFor(product.images[0]).url()],
            metadata: {
              // Store the Sanity product ID if needed later (e.g., in webhook)
              sanityProductId: product._id,
            },
          },
          // IMPORTANT: Use the price from Sanity. Ensure it's in the smallest unit (cents/pence).
          unit_amount: product.price * 100,
        },
        quantity: cartItem.quantity,
      });
    }

    if (lineItems.length === 0) {
      return { error: "No valid items to checkout." };
    }

    //Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      customer_email: userEmail, // Pre-fill email from Supabase Auth
      metadata: {
        // CRUCIAL: Store the Supabase user ID for the webhook handler
        userId: userIdForMetadata,
      },
      shipping_address_collection: {
        allowed_countries: ["GB"], // Adjust as needed
      },
    });

    if (!session.id) {
      console.error("Stripe session creation failed: No session ID returned");
      return { error: "Could not initiate payment. Please try again." };
    }

    return {
      success: true,
      error: null,
      sessionId: session.id,
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      success: false,
      error: "An error occurred while creating the checkout session.",
    };
  }
}
