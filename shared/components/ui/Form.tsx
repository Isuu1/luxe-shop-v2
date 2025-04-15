import React from "react";

//Styles
import styles from "./Form.module.scss";

interface FormProps {
  children: React.ReactNode;
  action?: (formData: FormData) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({ children, action, onSubmit }) => {
  return (
    <form action={action} onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};

export default Form;
