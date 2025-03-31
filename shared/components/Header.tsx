"use client";
import React, { useState } from "react";
import Link from "next/link";
//import { usePathname } from "next/navigation";

//Context
//import { useStateContext } from "../../context/StateContext";

//Animations
// import {
//   AnimatePresence,
//   useMotionValueEvent,
//   useScroll,
//   motion,
// } from "framer-motion";
// import { menuButtonVariants } from "../../styles/animations";

//Styles
import styles from "./Header.module.scss";

//Components
// import Menu from "../Menu/Menu";
// import Search from "../Search/Search";
// import ShoppingCartButton from "@/components/Buttons/ShoppingCartButton/ShoppingCartButton";
// import OpenModalButton from "@/components/Buttons/OpenModalButton/OpenModalButton";
// import UserModal from "../UserModal/UserModal";
// import LoginPrompt from "../LoginPrompt/LoginPrompt";
// import SearchBarButton from "../Buttons/SearchBarButton/SearchBarButton";

//Icons
//import { TiThMenu } from "react-icons/ti";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
//import { IoClose } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";

import { BiSupport } from "react-icons/bi";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { FaUserAlt } from "react-icons/fa";

import { FaBasketShopping } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import Search from "@/features/search/components/Search";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  //   const { showMenu, setShowMenu, userModal, loginPromptOpen, searchOpen } =
  //     useStateContext();

  // Get current path
  // const pathname = usePathname();

  // Hide navbar bottom when user is on product page
  //const showNavbarBottom = !pathname.startsWith("/product/");

  // Handling navbar top animation on scroll
  //   const { scrollY } = useScroll();
  //   useMotionValueEvent(scrollY, "change", (latest) => {
  //     const navbarTopRight = document.querySelector(".navbar-top__right");
  //     const navbarTopLeft = document.querySelector(".navbar-top__left");
  //     if (latest >= 65) {
  //       navbarTopRight.classList.add("navbar-top-right-transition");
  //       navbarTopLeft.classList.add("navbar-top-left-transition");
  //     } else {
  //       navbarTopRight.classList.remove("navbar-top-right-transition");
  //       navbarTopLeft.classList.remove("navbar-top-left-transition");
  //     }
  //   });

  //Open menu on mobile view
  //   const handleMenu = (e) => {
  //     e.stopPropagation();
  //     setShowMenu(!showMenu);
  //   };

  return (
    <div className={styles.header}>
      {/* <AnimatePresence mode="wait">
        {loginPromptOpen && <LoginPrompt />}
      </AnimatePresence> */}
      <AnimatePresence>{searchOpen && <Search />}</AnimatePresence>

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
        <FaUserAlt className={styles.item} />
        <FaBasketShopping className={styles.item} />
        {/* <Link className={styles.item} href="/search">
          <IoSearch />
        {/* <AnimatePresence mode="wait">
            {userModal && <UserModal user={user} />}
          </AnimatePresence>
          <SearchBarButton />
          <OpenModalButton user={user} />
          <ShoppingCartButton user={user} /> */}
      </div>

      {/* {showNavbarBottom && (
        <div className="navbar-bottom">
          <motion.button
            className="navbar-bottom__icon"
            onClick={handleMenu}
            animate={showMenu ? "open" : "close"}
            variants={menuButtonVariants}
          >
            {showMenu ? <IoClose /> : <TiThMenu />}
          </motion.button>

          <AnimatePresence mode="wait">
            {showMenu && <Menu key="menu" user={user} />}
          </AnimatePresence>
        </div>
      )} */}
    </div>
  );
};

export default Header;
