"use client";

import React, { useActionState, useEffect, useState } from "react";

//Styles
import styles from "./ContactForm.module.scss";
//Actions
import { sendMessage } from "../lib/actions/sendMessage";
//Types
import { ContactFormState } from "../types/forms";
//Components
import LoadingIcon from "@/shared/components/LoadingIcon";
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
//Icons
import { IoSend } from "react-icons/io5";
import { HiBackspace } from "react-icons/hi2";

const initialState: ContactFormState = {
  success: false,
  error: null,
};

const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(
    sendMessage,
    initialState
  );

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (state.error) {
      setError(state.error);
    } else {
      setError(null);
    }
    if (state.success) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [state]);

  return (
    <div className={styles.contactFormContainer}>
      {success && (
        <div className={styles.successMessage}>
          <h2>Message Sent!</h2>
          <p>Thank you for reaching out. We will get back to you soon.</p>
          <Button
            text="Back to form"
            icon={<HiBackspace />}
            iconPosition="left"
            variant="primary"
            type="button"
            onClick={() => setSuccess(false)}
          />
        </div>
      )}
      {!success && (
        <>
          <h3>Contact form</h3>
          <Form action={formAction}>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="luxe@email.com"
              onFocus={() => setError(null)}
            />
            <label>Message</label>
            <textarea
              className={styles.message}
              name="message"
              id="message"
              rows={4}
              cols={50}
              onFocus={() => setError(null)}
            />
            {error && <p className={styles.error}>{error}</p>}
            <Button
              variant="primary"
              text="Send"
              type="submit"
              disabled={isPending || success}
              icon={isPending ? <LoadingIcon /> : <IoSend />}
            />
          </Form>
        </>
      )}
    </div>
  );
};

export default ContactForm;
