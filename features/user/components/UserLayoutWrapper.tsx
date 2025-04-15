import React from "react";

//Styles
import styles from "@/features/user/components/UserLayoutWrapper.module.scss";
import UserNavMenu from "./UserNavMenu";

const UserLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.userLayout}>
      <UserNavMenu />
      {children}
    </div>
  );
};

export default UserLayoutWrapper;
