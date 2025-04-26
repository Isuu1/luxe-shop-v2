"use client";

import { createClient } from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  email: string | "";
  username: string | "";
  avatar: string | null;
  fetchUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  //This represents the user object coming from auth table, it is used only for authentication purposes
  //It is not used to store user data, for that we use the profiles table
  const [user, setUser] = useState<User | null>(null);
  //User data from profiles table
  const [email, setEmail] = useState<string | "">("");
  const [username, setUsername] = useState<string | "">("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const supabase = createClient();

  const fetchUser = useCallback(async () => {
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
        .select("email, username, avatar")
        .eq("id", authData.user.id)
        .single();

      // If profile fetch fails, log error but keep auth user, clear profile fields
      if (profileError) {
        console.error("Error fetching profile data:", profileError);
        setEmail("");
        setUsername("");
        setAvatar(null);
        return; // Exit after setting auth user but clearing profile
      }
      setEmail(profileData?.email || "");
      setUsername(profileData?.username || "");
      setAvatar(profileData?.avatar || null);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{ isLoading, user, email, username, avatar, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
