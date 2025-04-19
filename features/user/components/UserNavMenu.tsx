"use client";

import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

//Styles
import styles from "@/features/user/components/UserNavMenu.module.scss";
import { toastStyle } from "@/shared/styles/toast";
//Icons
import { FaUser } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
//Actions
import { signout } from "@/features/auth/lib/actions/signout";

const UserNavMenu = () => {
  const pathname = usePathname();

  const handleSignout = async () => {
    const { success, error } = await signout();
    if (error) {
      console.error("Error signing out:", error);
    }
    if (success) {
      toast.success("Successfully signed out", toastStyle);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  return (
    <nav className={styles.userNavMenu}>
      <Link href="/user/account">
        <div
          className={`${styles.menuItem} ${pathname === "/user/account" ? styles.active : ""}`}
        >
          <FaUser className={styles.icon} />
          <p>Account details</p>
        </div>
      </Link>
      <Link href="/user/wishlist">
        <div
          className={`${styles.menuItem} ${pathname === "/user/wishlist" ? styles.active : ""}`}
        >
          <IoHeart className={styles.icon} />
          <p>Wishlist</p>
        </div>
      </Link>
      <Link href="/user/orders">
        <div
          className={`${styles.menuItem} ${pathname === "/user/orders" ? styles.active : ""}`}
        >
          <IoWallet className={styles.icon} />
          <p>Orders</p>
        </div>
      </Link>
      <div
        className={`${styles.menuItem} ${styles.signout}`}
        onClick={handleSignout}
      >
        <FaSignOutAlt className={styles.icon} />
        <p>Signout</p>
      </div>
    </nav>
  );
};

export default UserNavMenu;
