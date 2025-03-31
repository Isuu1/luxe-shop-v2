import Image from "next/image";
import React from "react";

//Icons
import { BiSolidSend } from "react-icons/bi";
//Styles
import styles from "./Banner.module.scss";
import Button from "@/shared/components/ui/Button";

const Banner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <Image src="/images/banner-bg2.svg" fill alt="" priority />
      <div className={styles.text}>
        <h2 className={styles.title}>Headphones on sale!</h2>
        <p className={styles.description}>
          Discount 50% for the first transaction
        </p>
        <Button
          icon={<BiSolidSend />}
          text="Shop now "
          className={styles.button}
          variant="primary"
        ></Button>
      </div>
      <Image
        src="/images/headphones2.webp"
        fill
        className={styles.image}
        alt=""
        priority
      />
    </div>
  );
};

export default Banner;
