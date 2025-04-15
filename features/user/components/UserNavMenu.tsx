import React from "react";
import Link from "next/link";

//Styles
import styles from "@/features/user/components/UserNavMenu.module.scss";
//Icons
import { IoIosArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";

const UserNavMenu = () => {
  return (
    <nav className={styles.userNavMenu}>
      <Link href="/user/account">
        <div className={styles.menuItem}>
          <FaUser className={styles.icon} />
          <p>Account details</p>
          <IoIosArrowForward className={styles.icon} />
        </div>
      </Link>
      <Link href="/user/wishlist">
        <div className={styles.menuItem}>
          <IoHeart className={styles.icon} />
          <p>Wishlist</p>
          <IoIosArrowForward className={styles.icon} />
        </div>
      </Link>
      <Link href="/user/orders">
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
    </nav>
  );
};

export default UserNavMenu;
