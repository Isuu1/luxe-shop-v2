"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./SignupForm.module.scss";
//Icons
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
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
          type="password"
          label="Password"
          icon={<FaUnlock />}
          onFocus={() => setError(null)}
        />
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          icon={<FaUnlock />}
          onFocus={() => setError(null)}
        />
        {error && <AuthError error={error} />}
        <Button
          className={styles.button}
          variant="primary"
          text={isPending ? "Creating account..." : "Create account"}
          icon={
            isPending ? <div className={styles.loadingIcon}></div> : <IoSend />
          }
          type="submit"
          disabled={isPending || state.success}
        />
      </Form>
    </div>
  );
};

export default SignupForm;
