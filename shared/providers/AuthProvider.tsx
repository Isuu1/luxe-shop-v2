"use client";

import { createClient } from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  email: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  //This represents the user object coming from auth table, it is used only for authentication purposes
  //It is not used to store user data, for that we use the profiles table
  const [user, setUser] = useState<User | null>(null);
  //User data from profiles table
  const [email, setEmail] = useState<string | "">("");

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (authError || !authData.user) {
          return;
        }
        // Set the user object from the auth table
        setUser(authData.user);
        // Fetch the user's profile data from the Profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("email, avatar")
          .eq("id", authData.user.id)
          .single();

        // If profile fetch fails, log error but keep auth user, clear profile fields
        if (profileError) {
          console.error("Error fetching profile data:", profileError);
          setEmail("");
          return; // Exit after setting auth user but clearing profile
        }
        setEmail(profileData?.email || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ isLoading, user, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
