"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

//Icons
import { HiMenuAlt3 } from "react-icons/hi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { IoPeople } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
//Styles
import styles from "./HamburgerMenu.module.scss";
//Animations
import { AnimatePresence, motion } from "motion/react";

const navMenuVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const HamburgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [navMenuRef, showMenu]);

  return (
    <div className={styles.hamburgerMenu}>
      <i onClick={() => setShowMenu(!showMenu)} className={styles.icon}>
        <HiMenuAlt3 />
      </i>
      <AnimatePresence>
        {showMenu && (
          <motion.nav
            className={styles.nav}
            variants={navMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            ref={navMenuRef}
          >
            <div onClick={() => setShowMenu(false)}>
              <Link className={styles.item} href="/">
                <GoHomeFill />
                Home
              </Link>
            </div>
            <div onClick={() => setShowMenu(false)}>
              <Link className={styles.item} href="/products">
                <BiSolidCategoryAlt />
                Products
              </Link>
            </div>
            <div onClick={() => setShowMenu(false)}>
              <Link className={styles.item} href="/about">
                <IoPeople />
                About
              </Link>
            </div>
            <div onClick={() => setShowMenu(false)}>
              <Link className={styles.item} href="/support">
                <BiSupport />
                Support
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
