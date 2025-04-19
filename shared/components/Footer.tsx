import React from "react";

//Styles
import styles from "@/shared/components/Footer.module.scss";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.innerWrapper}>
        <div className={styles.contact}>
          <h3>Contact</h3>
          <p>Luxe Ltd.</p>
          <p>1 Kensington High Street </p>
          <p> London, W8 5NP </p>
          <p>United Kingdom</p>

          <p>
            <span className="bold">Phone: </span>+44 (0)20 7946 0958
          </p>
          <p>
            <span className="bold">Email:</span> info@luxeltd.co.uk
          </p>
        </div>
        <div className={styles.socials}>
          <h3>Socials</h3>
          <div className={styles.icons}>
            <Image
              className={styles.icon}
              src="/images/instagram-icon.svg"
              fill
              alt=""
            />
            <Image
              className={styles.icon}
              src="/images/x-icon.svg"
              fill
              alt=""
            />
            <Image
              className={styles.icon}
              src="/images/facebook-icon.svg"
              fill
              alt=""
            />
            <Image
              className={styles.icon}
              src="/images/linkedin-icon.svg"
              fill
              alt=""
            />
          </div>
        </div>
      </div>
      <p className={styles.copyright}>Copyright 2024. © All rights reserved</p>
    </footer>
  );
};

export default Footer;
