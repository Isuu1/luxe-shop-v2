"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
//Icons
import { MdKeyboardArrowLeft } from "react-icons/md";
//Styles
import styles from "./BackLink.module.scss";

const BackLink: React.FC = () => {
  const router = useRouter();

  const pathname = usePathname();

  const capitalizeLastPathSegment = () => {
    // 1. Handle edge cases: null, undefined, or empty string input
    if (!pathname) {
      return "";
    }

    // 2. Split the pathname by '/' and filter out empty strings
    //    This handles leading slashes (e.g., '/products' -> ['', 'products'])
    //    and trailing slashes (e.g., 'user/account/' -> ['user', 'account', ''])
    const parts = pathname.split("/").filter((part) => part.length > 0);

    // 3. Check if there are any valid parts left
    if (parts.length === 0) {
      // This happens if the input was '/' or just empty strings after split/filter
      return "";
      // You could return 'Home' here if you prefer: return 'Home';
    }

    // 4. Get the last element from the filtered array
    const lastPart = parts[parts.length - 1];

    // 5. Capitalize the first letter and combine with the rest of the string
    const capitalizedLastPart =
      lastPart.charAt(0).toUpperCase() + lastPart.slice(1);

    // 5.1. Handle special case for '-' in product name
    if (capitalizedLastPart.includes("-")) {
      const parts = capitalizedLastPart
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1));
      return parts.join(" ");
    }

    // 6. Return the result
    return capitalizedLastPart;
  };

  return (
    <div className={styles.backLink}>
      <MdKeyboardArrowLeft
        className={styles.icon}
        onClick={() => router.back()}
      />
      <span>{capitalizeLastPathSegment()}</span>
      <span></span>
    </div>
  );
};

export default BackLink;
