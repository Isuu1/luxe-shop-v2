"use client";

import React from "react";

//Styles
import styles from "./SocialAuthProviders.module.scss";
//Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Button from "@/shared/components/ui/Button";
import { createClient } from "@/supabase/client";

const SocialAuthProviders = () => {
  const supabase = createClient();

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `/api/auth/callback`,
      },
    });
    if (error) {
      console.error("GitHub Login Error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `/api/auth/callback`,
      },
    });
    if (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  return (
    <div className={styles.socialAuthProviders}>
      <h2>or</h2>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          icon={<FaGithub />}
          type="button"
          onClick={handleGitHubLogin}
        />
        <Button
          className={styles.button}
          icon={<FcGoogle />}
          type="button"
          onClick={handleGoogleLogin}
        />
      </div>
    </div>
  );
};

export default SocialAuthProviders;
