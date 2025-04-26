"use client";

import React from "react";

//Styles
import styles from "@/features/auth/components/AuthLayoutWrapper.module.scss";
import AuthNavMenu from "./AuthNavMenu";
import SocialAuthProviders from "./SocialAuthProviders";
//Icons
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";

const AuthLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className={styles.authLayout}>
      <div className={styles.background}></div>
      <div className={styles.formContainer}>
        <div className={styles.backLink}>
          <MdKeyboardArrowLeft
            className={styles.icon}
            onClick={() => router.push("/")}
          />
          {/* <span>Go back to home</span> */}
        </div>
        <AuthNavMenu />
        <h1 className={styles.logo}>luxe.</h1>
        {children}
        <SocialAuthProviders />
      </div>
    </div>
  );
};

export default AuthLayoutWrapper;
