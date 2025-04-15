import React from "react";

//Styles
import styles from "@/features/user/components/UserLayoutWrapper.module.scss";
import UserNavMenu from "./UserNavMenu";
import BackLink from "@/shared/components/BackLink";

const UserLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.userLayout}>
      <BackLink />
      <div className={styles.innerWrapper}>
        <UserNavMenu />
        {children}
      </div>
    </div>
  );
};

export default UserLayoutWrapper;
