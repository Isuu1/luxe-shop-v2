"use server";

import { Product } from "@/shared/types/product";
import { createClient } from "@/supabase/server";

export async function addToWishlist(product: Product) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
      return { error: "User not authenticated", status: 401 };
    }

    const userId = userData.user.id;

    //Select the user's profile favourite gifs table
    const { data: userWishlist } = await supabase
      .from("profiles")
      .select("wishlist")
      .eq("id", userId)
      .single();

    if (!userWishlist) {
      console.error("User wishlist not found");
      return;
    }

    const isProductInWishlist = userWishlist?.wishlist?.some(
      (item: Product) => item._id === product._id
    );

    console.log("Is in wishlist", isProductInWishlist);

    //If product is already in wishlist, remove it
    if (isProductInWishlist) {
      const updatedWishlist = userWishlist.wishlist.filter(
        (item: Product) => item._id !== product._id
      );

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ wishlist: updatedWishlist })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating wishlist:", updateError);
        return {
          success: false,
          error: "Failed to update wishlist",
          status: 500,
        };
      }
    } else {
      //If product is not in wishlist, add it
      const updatedWishlist = [...(userWishlist.wishlist || []), product];

      const { error: insertError } = await supabase
        .from("profiles")
        .update({ wishlist: updatedWishlist })
        .eq("id", userId);

      if (insertError) {
        console.error("Error inserting into wishlist:", insertError);
        return {
          success: false,
          error: "Failed to insert into wishlist",
          status: 500,
        };
      }
    }
  } catch (error) {
    console.error("Error creating Supabase client:", error);
    return {
      success: false,
      error: "Failed to create Supabase client",
      status: 500,
    };
  }
  return {
    success: true,
    error: null,
    status: 200,
    product,
  };
}
