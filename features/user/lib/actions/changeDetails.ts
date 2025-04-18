"use server";

import { createClient } from "@/supabase/server";
import { ChangeDetailsFormState } from "../../types/forms";

export async function changeUserDetails(
  prevState: ChangeDetailsFormState,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
  };

  // Get the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) {
    return {
      data,
      error: "User not authenticated",
      success: false,
      resetKey: Date.now(),
    };
  }

  const userId = userData.user.id;

  //Update  username in users table
  const { error: profileUsernameError } = await supabase
    .from("profiles")
    .update({ username: data.username })
    .eq("id", userId);

  if (profileUsernameError) {
    return {
      data,
      error: "Failed to update username",
      success: false,
      resetKey: Date.now(),
    };
  }

  // Update email in the Auth table
  const { error: emailError } = await supabase.auth.updateUser(
    {
      email: data.email,
    },
    {
      emailRedirectTo: `${process.env.SITE_URL}/user/account-details?email_updated=true`,
    }
  );

  if (emailError) {
    return {
      data,
      error: "Failed to update email",
      success: false,
      resetKey: Date.now(),
    };
  }

  //Update user email in users table
  const { error: profileEmailError } = await supabase
    .from("profiles")
    .update({ username: data.username, email: data.email })
    .eq("id", userId);

  if (profileEmailError) {
    return {
      data,
      error: "Failed to update email",
      success: false,
      resetKey: Date.now(),
    };
  }

  return {
    data,
    error: null,
    success: true,
    resetKey: Date.now(),
  };
}
