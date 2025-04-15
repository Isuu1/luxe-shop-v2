"use server";

import { createClient } from "@/supabase/server";

export async function resendConfirmation(email: string) {
  const supabase = await createClient();

  if (!email) {
    return { error: "Email is required" };
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  if (error)
    return { error: "Failed to resend confirmation email. Try again later." };

  return { success: "Confirmation email sent! Check your inbox." };
}
