import React from "react";

//Styles
import styles from "./SocialAuthProviders.module.scss";
//Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Button from "@/shared/components/ui/Button";

const SocialAuthProviders = () => {
  return (
    <div className={styles.socialAuthProviders}>
      <h2>or</h2>

      <div className={styles.buttons}>
        <Button className={styles.button} icon={<FaGithub />} type="button" />
        <Button className={styles.button} icon={<FcGoogle />} type="button" />
      </div>
    </div>
  );
};

export default SocialAuthProviders;
