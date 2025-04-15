import React from "react";

//Styles
import styles from "@/features/auth/components/AuthLayoutWrapper.module.scss";
import AuthNavMenu from "./AuthNavMenu";

const AuthLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.background}></div>
      <div className={styles.formContainer}>
        <AuthNavMenu />
        <h1 className={styles.logo}>luxe.</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayoutWrapper;
