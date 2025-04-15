import React from "react";

//Styles
import styles from "@/features/user/components/UserLayoutWrapper.module.scss";

const UserLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.userLayout}>{children}</div>;
};

export default UserLayoutWrapper;
