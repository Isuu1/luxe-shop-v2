"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

//Styles
import styles from "./LoginPrompt.module.scss";
//Animations
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const loginPromptVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

interface LoginPromptProps {
  onClose: () => void;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ onClose }) => {
  const [isMounted, setIsMounted] = useState(false);

  const loginPromptRef = useRef<HTMLDivElement>(null);
  const loginPromptRootRef = useRef<HTMLElement | null>(null);

  const [sliderWidth, setSliderWidth] = useState(100);
  const duration = 3000; // Total animation time
  const steps = 100; // Steps from 100 to 0
  const intervalTime = duration / steps; // Time between updates

  // Function to stop propagation for clicks inside the prompt
  const handleInsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (sliderWidth > 0) {
      const intervalId = setInterval(() => {
        setSliderWidth((prevCount) => prevCount - 1);
      }, intervalTime);
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
    if (sliderWidth === 0) {
      onClose();
    }
  }, [intervalTime, sliderWidth, onClose]);

  useEffect(() => {
    setIsMounted(true);
    let portalNode = document.getElementById("modal-root");
    if (!portalNode) {
      portalNode = document.createElement("div");
      portalNode.id = "modal-root";
      document.body.appendChild(portalNode);
    }
    loginPromptRootRef.current = portalNode;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginPromptRef.current &&
        !loginPromptRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    //Using pointerdown instead of click makes sure the event is caught before the element disappears
    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [onClose]);

  const promptMarkup = (
    <div className={styles.loginPromptContainer} onClick={handleInsideClick}>
      <motion.div
        className={styles.loginPrompt}
        variants={loginPromptVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        ref={loginPromptRef}
      >
        <p>
          <span>
            <Link href="/login" scroll={true}>
              <strong>Login</strong>
            </Link>
          </span>
          {` or `}
          <span>
            <Link href="/signup" scroll={true}>
              <strong>Signup </strong>
            </Link>
          </span>
          to save items in your Wishlist.
        </p>
        <div
          className={styles.slider}
          style={{
            width: `${sliderWidth}%`,
          }}
        ></div>
      </motion.div>
    </div>
  );

  // Render nothing during SSR or before mount/target is ready
  if (!isMounted || !loginPromptRootRef.current /*|| !isOpen */) {
    // Add !isOpen check if using prop
    return null;
  }

  return createPortal(promptMarkup, loginPromptRootRef.current);
};

export default LoginPrompt;
