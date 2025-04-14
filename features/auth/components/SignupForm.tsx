"use client";

import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import React, { useActionState } from "react";

//Styles
import styles from "./SignupForm.module.scss";

//Icons
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Button from "@/shared/components/ui/Button";
import { SignupFormState } from "../types/forms";
import { signup } from "../actions/auth";

const initialState: SignupFormState = {
  success: false,
  data: { email: "", password: "", confirmPassword: "" },
  error: null,
  status: 0,
};

const SignupForm = () => {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  console.log(state);

  return (
    <div className={styles.signupForm}>
      <Form action={formAction}>
        <Input id="email" type="email" label="Email" icon={<FaUser />} />
        <Input
          id="password"
          type="password"
          label="Password"
          icon={<FaUnlock />}
        />
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          icon={<FaUnlock />}
        />
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
