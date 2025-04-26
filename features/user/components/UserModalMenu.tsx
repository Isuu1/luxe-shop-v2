"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

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
import { toastStyle } from "@/shared/styles/toast";
//Providers
import { useAuth } from "@/shared/providers/AuthProvider";
//Actions
import { signout } from "@/features/auth/lib/actions/signout";

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
  const { email, user, username, avatar } = useAuth();

  const userModalRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userModalRef.current &&
        !userModalRef.current.contains(event.target as Node)
      ) {
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

  const handleSignout = async () => {
    const { success, error } = await signout();
    if (error) {
      console.error("Error signing out:", error);
    }
    if (success) {
      setModalOpen(false);
      toast.success("Successfully signed out", toastStyle);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

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
                src={avatar || "/images/avatar.gif"}
                alt=""
                width={60}
                height={60}
              />
            </div>
            {user && <p className={styles.username}>{username}</p>}
            {user && <em className={styles.email}>{email}</em>}
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
                  <div
                    className={`${styles.menuItem} ${styles.signout}`}
                    onClick={handleSignout}
                  >
                    <FaSignOutAlt className={styles.icon} />
                    <p>Signout</p>
                  </div>
                </>
              )}
              {!user && (
                <div className={styles.loggedOut}>
                  <p>Hello there! 👋</p>
                  <p>
                    <strong>
                      <Link href="/login">Sign in</Link>
                    </strong>{" "}
                    to view your profile, wishlist, and order history.
                  </p>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserModalMenu;
