"use server";

import { client } from "@/sanity/lib/client";
import { stripe } from "@/shared/lib/stripe";
import { createClient } from "@/supabase/server";
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
}

export async function createCheckoutSession(cartItems: CartItemInput[]) {
  try {
    const supabase = await createClient();

    // 1. Get Authenticated User (from Supabase)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return {
        success: false,
        error: "User not authenticated. Please log in.",
      };
    }

    if (!cartItems || cartItems.length === 0) {
      return { success: false, error: "Cannot checkout with an empty cart." };
    }

    // 2. Fetch Product Data & Validate Prices (from Sanity)
    const productIds = cartItems.map((item) => item.productId);

    const query = `*[_type == "product" && _id in $productIds]{
          _id,
          name,
          price
        }`;

    const sanityProducts = await client.fetch<SanityProduct[]>(query, {
      productIds,
    });
    console.log("sanityProducts", sanityProducts);

    // 3. Create Stripe Line Items (Using Sanity Prices)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const cartItem of cartItems) {
      const product = sanityProducts.find((p) => p._id === cartItem.productId);

      if (!product) {
        // This check is slightly redundant due to the length check above, but good for clarity
        console.error(
          `Validation Error: Product ${cartItem.productId} was in input but not found in Sanity results.`
        );
        return { error: `Item ${cartItem.productId} is unavailable.` };
      }

      if (typeof product.price !== "number" || product.price < 0) {
        console.error(
          `Validation Error: Invalid price (${product.price}) for product ${product._id} (${product.name}). Price must be a non-negative number.`
        );
        return {
          error: `Invalid price for item ${product.name}. Please contact support.`,
        };
      }

      // Ensure quantity is valid
      if (cartItem.quantity <= 0) {
        console.warn(
          `Skipping item ${product._id} with quantity ${cartItem.quantity}`
        );
        continue; // Skip items with zero or negative quantity
      }

      lineItems.push({
        price_data: {
          currency: "gbp", // CHANGE TO YOUR CURRENCY
          product_data: {
            name: product.name,
            // Add description, images if needed/available from Sanity
            // images: [urlFor(product.image).url()] // Example if you have images
            metadata: {
              // Store the Sanity product ID if needed later (e.g., in webhook)
              sanityProductId: product._id,
            },
          },
          // IMPORTANT: Use the price from Sanity. Ensure it's in the smallest unit (cents/pence).
          unit_amount: product.price,
        },
        quantity: cartItem.quantity,
      });
    }

    console.log("lineItems", lineItems);

    if (lineItems.length === 0) {
      return { error: "No valid items to checkout." };
    }

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      customer_email: user.email, // Pre-fill email from Supabase Auth
      metadata: {
        // CRUCIAL: Store the Supabase user ID for the webhook handler
        userId: user.id,
        // Optional: You could store stringified cart details for reference, but mind limits
        // cartItems: JSON.stringify(cartItemsInput.map(i => `${i.productId}x${i.quantity}`)),
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
