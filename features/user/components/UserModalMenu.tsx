"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

//Icons
import { IoIosArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
//Animations
import { AnimatePresence, motion } from "framer-motion";
//Styles
import styles from "./UserModalMenu.module.scss";
//Providers
import { useAuth } from "@/shared/providers/AuthProvider";

export const userModalVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hidden: {
    opacity: 0,
    scale: 0,
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const UserModalMenu = () => {
  const { email, user, username } = useAuth();

  const userModalRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userModalRef.current &&
        !userModalRef.current.contains(event.target as Node)
      ) {
        console.log(userModalRef.current);
        console.log(event.target);
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [userModalRef, modalOpen]);

  return (
    <div>
      <FaUserAlt
        className={styles.icon}
        onClick={() => setModalOpen(!modalOpen)}
      />
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className={styles.userModal}
            variants={userModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={userModalRef}
          >
            <div className={styles.background}></div>

            <div className={styles.header}>
              <Image
                className={styles.avatar}
                src="/images/avatar.gif"
                alt=""
                width={60}
                height={60}
              />
            </div>
            <p className={styles.username}>{username}</p>
            <em className={styles.email}>{email}</em>
            <nav className={styles.menu}>
              {user && (
                <>
                  <Link
                    href="/user/account"
                    onClick={() => setModalOpen(false)}
                  >
                    <div className={styles.menuItem}>
                      <FaUser className={styles.icon} />
                      <p>Account details</p>
                      <IoIosArrowForward className={styles.icon} />
                    </div>
                  </Link>
                  <Link
                    href="/user/wishlist"
                    onClick={() => setModalOpen(false)}
                  >
                    <div className={styles.menuItem}>
                      <IoHeart className={styles.icon} />
                      <p>Wishlist</p>
                      <IoIosArrowForward className={styles.icon} />
                    </div>
                  </Link>
                  <Link href="/user/orders" onClick={() => setModalOpen(false)}>
                    <div className={styles.menuItem}>
                      <IoWallet className={styles.icon} />
                      <p>Orders</p>
                      <IoIosArrowForward className={styles.icon} />
                    </div>
                  </Link>
                  <div className={`${styles.menuItem} ${styles.signout}`}>
                    <FaSignOutAlt className={styles.icon} />
                    <p>Signout</p>
                  </div>
                </>
              )}
              {!user && (
                <p>
                  Please{" "}
                  <strong>
                    <Link href="/user">log in</Link>
                  </strong>
                  to see this page
                </p>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserModalMenu;
