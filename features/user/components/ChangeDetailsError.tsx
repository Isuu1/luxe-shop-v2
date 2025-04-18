import React from "react";

//Styles
import styles from "./ChangeDetailsError.module.scss";
//Icons
import { MdOutlineError } from "react-icons/md";

interface IProps {
  message: string[];
}

const ChangeDetailsError: React.FC<IProps> = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      {message.map((error) => (
        <p key={error} className={styles.errorMessage}>
          <MdOutlineError className={styles.icon} /> <span>{error}</span>
        </p>
      ))}
    </div>
  );
};

export default ChangeDetailsError;
