import React from "react";

//Animations
import { motion } from "framer-motion";
//Styles
import styles from "./AuthError.module.scss";
//Icons
import { MdOutlineError } from "react-icons/md";

export const errorVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
};

interface AuthErrorProps {
  error: string | null;
}

const AuthError: React.FC<AuthErrorProps> = ({ error }) => {
  return (
    <motion.div
      className={styles.errorContainer}
      variants={errorVariants}
      initial="hidden"
      animate="visible"
    >
      <p className={styles.errorMessage}>
        <MdOutlineError className={styles.icon} />
        {error}
      </p>
    </motion.div>
  );
};

export default AuthError;
