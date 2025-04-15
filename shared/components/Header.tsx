"use client";
import React, { useState } from "react";
import Link from "next/link";

//Styles
import styles from "./Header.module.scss";

//Icons
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { IoPeople } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
//Animations
import { AnimatePresence } from "framer-motion";
//Components
import Search from "@/features/search/components/Search";
import Cart from "@/features/cart/components/Cart";
import UserModalMenu from "@/features/user/components/UserModalMenu";
//Providers
import { useCartContext } from "@/shared/providers/CartProvider";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const { showCart, setShowCart } = useCartContext();

  return (
    <div className={styles.header}>
      {/* <AnimatePresence mode="wait">
        {loginPromptOpen && <LoginPrompt />}
      </AnimatePresence> */}
      <AnimatePresence mode="wait">
        {searchOpen && (
          <Search
            key="search-container"
            closeSearch={() => setSearchOpen(false)}
          />
        )}
        {showCart && <Cart />}
      </AnimatePresence>

      <div className={styles.left}>
        <h1 className={styles.logo}>luxe.</h1>

        <nav className={styles.menu}>
          <Link className={styles.item} href="/">
            <GoHomeFill />
            Home
          </Link>
          <Link className={styles.item} href="/products">
            <BiSolidCategoryAlt />
            Products
          </Link>
          <Link className={styles.item} href="/about">
            <IoPeople />
            About
          </Link>
          <Link className={styles.item} href="/support">
            <BiSupport />
            Support
          </Link>
        </nav>
      </div>
      <div className={styles.right}>
        <FaMagnifyingGlass
          className={styles.item}
          onClick={() => setSearchOpen(true)}
        />
        <UserModalMenu />
        <FaBasketShopping
          className={styles.item}
          onClick={() => setShowCart(true)}
        />
      </div>
    </div>
  );
};

export default Header;
