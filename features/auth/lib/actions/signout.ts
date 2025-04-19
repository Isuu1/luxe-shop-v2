"use server";

import { createClient } from "@/supabase/server";

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    return { error: "Failed to sign out." };
  }

  return { success: true };
}
