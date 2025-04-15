"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./SignupForm.module.scss";
//Icons
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import AuthError from "./AuthError";
//Types
import { SignupFormState } from "../types/forms";
//Actions
import { signup } from "../lib/actions/auth";
//Utils
import { normalizeErrors } from "../lib/utils";
import LoadingIcon from "@/shared/components/LoadingIcon";

const initialState: SignupFormState = {
  success: false,
  data: { email: "", password: "", confirmPassword: "" },
  error: null,
  status: 0,
  resetKey: Date.now(),
};

const SignupForm = () => {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  const [error, setError] = useState<string[] | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      setError(normalizeErrors(state.error));
    }
  }, [state.error, state.resetKey]);

  useEffect(() => {
    if (state.success) {
      setError(null);
      router.push(`/signup/success?email=${state.data.email}`);
    }
  }, [state.success, state.resetKey, router, state.data.email]);

  return (
    <div className={styles.signupForm}>
      <p className={styles.subHeadline}>
        Track orders, create wishlists, and manage returns easily.
      </p>
      <Form action={formAction}>
        <Input
          id="email"
          type="email"
          label="Email"
          icon={<FaUser />}
          onFocus={() => setError(null)}
        />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          icon={<FaUnlock />}
          onFocus={() => setError(null)}
          showPasswordIcon={
            showPassword ? (
              <FaEye onClick={() => setShowPassword(false)} />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(true)} />
            )
          }
        />
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          label="Confirm password"
          icon={<FaUnlock />}
          onFocus={() => setError(null)}
        />
        {error && <AuthError error={error} />}
        <Button
          className={styles.button}
          variant="primary"
          text={isPending ? "Creating account..." : "Create account"}
          icon={isPending ? <LoadingIcon /> : <IoSend />}
          type="submit"
          disabled={isPending || state.success}
        />
      </Form>
    </div>
  );
};

export default SignupForm;
