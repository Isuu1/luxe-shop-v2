"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

//Styles
import styles from "@/features/auth/components/AuthNavMenu.module.scss";
//Components
import Button from "@/shared/components/ui/Button";

const AuthNavMenu = () => {
  const pathname = usePathname();

  const router = useRouter();

  return (
    <ul className={styles.authNavMenu}>
      <li
        className={styles.item}
        style={{ color: pathname === "/login" ? "#fff" : "#333" }}
      >
        <Button
          type="button"
          text="Login"
          onClick={() => router.push("/login")}
          className={pathname === "/login" ? styles.active : ""}
        />
      </li>
      <li className={styles.item}>
        <Button
          type="button"
          text="Signup"
          onClick={() => router.push("/signup")}
          className={pathname === "/signup" ? styles.active : ""}
        />
      </li>
    </ul>
  );
};

export default AuthNavMenu;
