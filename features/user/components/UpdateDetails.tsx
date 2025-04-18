"use client";

import React, { useActionState, useEffect } from "react";

//Icons
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";
//Providers
import { useAuth } from "@/shared/providers/AuthProvider";
//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import { ChangeDetailsFormState } from "../types/forms";
import { changeUserDetails } from "../lib/actions/changeDetails";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toast";
import LoadingIcon from "@/shared/components/LoadingIcon";
//Styles
import styles from "./UpdateDetails.module.scss";
import { createClient } from "@/supabase/client";

const initialState: ChangeDetailsFormState = {
  data: { email: "", username: "" },
  error: null,
  success: false,
  resetKey: Date.now(),
};

const UpdateDetails = () => {
  const { user, email, username, fetchUser } = useAuth();

  const [state, formAction, isPending] = useActionState(
    changeUserDetails,
    initialState
  );

  const handleResendEmail = async () => {
    const supabase = createClient();
    await supabase.auth.resend({
      type: "email_change",
      email: email,
    });
    toast.success("Email resent successfully", toastStyle);
  };

  useEffect(() => {
    if (state.error) {
      toast.error(state.error, toastStyle);
    }
  }, [state.error, state.resetKey]);

  useEffect(() => {
    if (state.success) {
      fetchUser();
      toast.success("Details updated successfully", toastStyle);
    }
  }, [state.success, state.resetKey, fetchUser]);

  return (
    <div>
      <Form action={formAction}>
        <Input
          label="Email"
          id="email"
          type="text"
          icon={<IoMdMail />}
          defaultValue={email}
        />
        {user?.new_email && user?.email !== user?.new_email && (
          <>
            <div className={styles.confirmEmail}>
              <p className={styles.confirmEmailText}>
                <MdOutlineError className={styles.icon} />
                <span>
                  You need to confirm your new email before you can use it.
                  We`ve sent you a confirmation email to your new email address.
                </span>
              </p>
              <Button
                type="button"
                text={"Resend email"}
                onClick={handleResendEmail}
                variant="primary"
              ></Button>
            </div>
          </>
        )}
        <Input
          label="Username"
          id="username"
          type="text"
          icon={<FaUser />}
          defaultValue={username}
        />
        <Button
          variant="primary"
          text="Update details"
          type="submit"
          icon={isPending ? <LoadingIcon /> : <IoSend />}
          disabled={isPending}
        />
      </Form>
    </div>
  );
};

export default UpdateDetails;
