import React from "react";

//Styles
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spin}></div>
    </div>
  );
};

export default Loading;
