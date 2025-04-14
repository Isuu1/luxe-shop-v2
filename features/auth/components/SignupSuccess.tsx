"use client";

import Link from "next/link";
import React from "react";

//Styles
import styles from "./SignupSuccess.module.scss";
import Button from "@/shared/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { resendConfirmation } from "../lib/actions/resendConfirmation";

const SignupSuccess = () => {
  const params = useSearchParams();
  const email = params.get("email");

  return (
    <div className={styles.signupSuccess}>
      <h2>Account created!</h2>
      <h3>Check Your Inbox!</h3>
      <p>We`ve sent a confirmation link to your email address.</p>
      <p>Please click the link in the email to activate your account.</p>
      <div className={styles.info}>
        <p>Didn`t receive it? Check your spam folder or</p>
        <Button
          text="Resend email"
          variant="primary"
          className={styles.button}
          type="button"
          onClick={() => resendConfirmation(email as string)}
        />
      </div>
      <Link href="/login">
        Go to <strong>Login</strong>
      </Link>
    </div>
  );
};

export default SignupSuccess;
