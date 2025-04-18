"use server";

import { createClient } from "@/supabase/server";
import { ChangePasswordFormState } from "../../types/forms";
import { changePasswordSchema } from "../../schemas/changePassword";

export async function changeUserPassword(
  prevState: ChangePasswordFormState,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    newPassword: formData.get("new-password") as string,
    confirmPassword: formData.get("confirm-password") as string,
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
  const validateSignupData = changePasswordSchema.safeParse(data);

  if (!validateSignupData.success) {
    return {
      data,
      error: validateSignupData.error.format(),
      success: false,
      resetKey: Date.now(),
    };
  }

  //Update password in the Auth table
  const { error: passwordError } = await supabase.auth.updateUser({
    password: data.newPassword,
  });

  if (passwordError) {
    return {
      data,
      error: passwordError.message,
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
