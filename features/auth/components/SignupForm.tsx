"use client";

import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import React, { useActionState, useEffect, useState } from "react";

//Styles
import styles from "./SignupForm.module.scss";

//Icons
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Button from "@/shared/components/ui/Button";
import { SignupFormState } from "../types/forms";
import { signup } from "../actions/auth";
import AuthError from "./AuthError";
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

  console.log(state);

  useEffect(() => {
    if (state.error) {
      setError(normalizeErrors(state.error));
    }
  }, [state.error, state.resetKey]);

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
          disabled={isPending}
        />
      </Form>
    </div>
  );
};

export default SignupForm;
