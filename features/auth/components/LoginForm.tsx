"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

//Styles
import styles from "./LoginForm.module.scss";
import { toastStyle } from "@/shared/styles/toast";
//Icons
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import AuthError from "./AuthError";
//Types
import { LoginFormState } from "../types/forms";
//Actions
import { login } from "../lib/actions/auth";
//Utils
import { normalizeErrors } from "../lib/utils";
import LoadingIcon from "@/shared/components/LoadingIcon";

const initialState: LoginFormState = {
  success: false,
  data: { email: "", password: "" },
  error: null,
  status: 0,
  resetKey: Date.now(),
};

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, initialState);

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
      toast.success("Login successful!", toastStyle);
      setTimeout(() => {
        router.push(`/`);
      }, 2000);
    }
  }, [state.success, state.resetKey, router, state.data.email]);

  return (
    <div className={styles.loginForm}>
      <p className={styles.subHeadline}>
        Manage your profile, access your wishlist and saved items.
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
          type="password"
          label="Password"
          icon={<FaUnlock />}
          onFocus={() => setError(null)}
          showPasswordIcon={<FaEye />}
        />
        {error && <AuthError error={error} />}
        <Button
          className={styles.button}
          variant="primary"
          text={isPending ? "Logging in..." : "Login"}
          icon={isPending ? <LoadingIcon /> : <IoSend />}
          type="submit"
          disabled={isPending || state.success}
        />
      </Form>
    </div>
  );
};

export default LoginForm;
