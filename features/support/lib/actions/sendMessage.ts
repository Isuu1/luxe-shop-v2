"use server";

import { ContactFormState } from "../../types/forms";

export async function sendMessage(
  prevState: ContactFormState,
  formData: FormData
) {
  const email = formData.get("email");
  const message = formData.get("message");

  if (!email || !message) {
    return {
      success: false,
      error: "Email and message are required",
    };
  }

  return {
    success: true,
    error: null,
  };
}
