"use server";

import { createClient } from "@/supabase/server";
import { SignupFormState } from "../../types/forms";
import { signupSchema } from "../../schemas/signup";

export async function signup(prevState: SignupFormState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const data = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  if (!email || !password || !confirmPassword) {
    return {
      error: "Please fill in all fields",
      success: false,
      data,
      status: 400,
      resetKey: Date.now(),
    };
  }

  const validateSignupData = signupSchema.safeParse(data);

  //Return data along with error message to to able to set email as default value (prevent clearing the input)
  if (!validateSignupData.success) {
    return {
      error: validateSignupData.error.format(),
      success: false,
      data,
      status: 400,
      resetKey: Date.now(),
    };
  }

  //Check if passwords match
  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
      success: false,
      data,
      status: 400,
      resetKey: Date.now(),
    };
  }

  try {
    const supabase = await createClient();

    // Include all initial user data in metadata to insert them into database
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          email: data.email,
          avatar: "",
          favourites: [],
        },
      },
    });

    if (error) {
      return {
        error: error.message,
        success: false,
        data,
        status: 400,
        resetKey: Date.now(),
      };
    }

    return {
      success: true,
      data,
      error: null,
      status: 200,
      resetKey: Date.now(),
    };
  } catch (error) {
    console.error("Error signing up:", error);
    return {
      success: false,
      data,
      error: error as string,
      status: 500,
      resetKey: Date.now(),
    };
  }
}
