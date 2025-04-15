"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { Product } from "../types/product";
import { createClient } from "@/supabase/client";

interface WishlistContextType {
  wishlist: Product[];
  isLoading: boolean;
  fetchWishlist: () => Promise<void>;
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [wishlist, setWishlist] = useState<Product[]>([]);

  const supabase = createClient();

  const fetchWishlist = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        return;
      }

      // Fetch the user's profile data from the Profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("wishlist")
        .eq("id", authData.user.id)
        .single();

      // If profile fetch fails, log error but keep auth user, clear profile fields
      if (profileError) {
        console.error("Error fetching profile data:", profileError);
        setWishlist([]);
        return; // Exit after setting auth user but clearing profile
      }
      setWishlist(profileData?.wishlist || null);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, isLoading, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = React.useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
