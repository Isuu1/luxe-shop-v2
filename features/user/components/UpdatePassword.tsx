"use client";

import React, { useActionState, useEffect, useState } from "react";

//Icons
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import { ChangePasswordFormState } from "../types/forms";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toast";
import LoadingIcon from "@/shared/components/LoadingIcon";
//Styles
import styles from "./UpdatePassword.module.scss";
import { changeUserPassword } from "../lib/actions/changePassword";
import { normalizeErrors } from "@/features/auth/lib/utils";
import ChangeDetailsError from "./ChangeDetailsError";

const initialState: ChangePasswordFormState = {
  data: { newPassword: "", confirmPassword: "" },
  error: null,
  success: false,
  resetKey: Date.now(),
};

const UpdateDetails = () => {
  const [state, formAction, isPending] = useActionState(
    changeUserPassword,
    initialState
  );

  const [error, setError] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (state.error) {
      const normalizedErrors = normalizeErrors(state.error);
      setError(normalizedErrors);
    }
  }, [state.resetKey, state.error]);

  useEffect(() => {
    if (state.success) {
      toast.success("Details updated successfully", toastStyle);
    }
  }, [state.success, state.resetKey]);

  return (
    <div className={styles.updatePassword}>
      <h2>Account password</h2>
      <Form action={formAction}>
        <Input
          label="New password"
          id="new-password"
          type={showPassword ? "text" : "password"}
          icon={<IoMdMail />}
          onFocus={() => setError([])}
          showPasswordIcon={
            showPassword ? (
              <FaEye onClick={() => setShowPassword(false)} />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(true)} />
            )
          }
        />
        <Input
          label="Confirm password"
          id="confirm-password"
          type={showPassword ? "text" : "password"}
          icon={<FaUser />}
          onFocus={() => setError([])}
          showPasswordIcon={
            showPassword ? (
              <FaEye onClick={() => setShowPassword(false)} />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(true)} />
            )
          }
        />

        {error.length > 0 && <ChangeDetailsError key="error" message={error} />}

        <Button
          variant="primary"
          text="Update password"
          type="submit"
          icon={isPending ? <LoadingIcon /> : <IoSend />}
          disabled={isPending}
        />
      </Form>
    </div>
  );
};

export default UpdateDetails;
