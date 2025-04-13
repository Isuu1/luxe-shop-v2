import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import React from "react";

//Styles
import styles from "./SignupForm.module.scss";

//Icons
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Button from "@/shared/components/ui/Button";

const SignupForm = () => {
  return (
    <div className={styles.signupForm}>
      <Form>
        <Input id="email" type="text" label="Email" icon={<FaUser />} />
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
          text="Create account"
          icon={<IoSend />}
          type="submit"
        />
      </Form>
    </div>
  );
};

export default SignupForm;
