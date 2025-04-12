"use client";

import React from "react";

//Icons
import { MdKeyboardArrowLeft } from "react-icons/md";
//Styles
import styles from "./BackLink.module.scss";
import { useRouter } from "next/navigation";

interface BackLinkProps {
  previousPage: string;
}

const BackLink: React.FC<BackLinkProps> = ({ previousPage }) => {
  const router = useRouter();

  return (
    <div className={styles.backLink}>
      <MdKeyboardArrowLeft
        className={styles.icon}
        onClick={() => router.back()}
      />
      <span>{previousPage}</span>
      <span></span>
    </div>
  );
};

export default BackLink;
