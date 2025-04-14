import React from "react";

//Styles
import styles from "@/features/auth/components/AuthLayoutWrapper.module.scss";

const AuthLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.background}></div>
      <div className={styles.formContainer}>{children}</div>
    </div>
  );
};

export default AuthLayoutWrapper;
