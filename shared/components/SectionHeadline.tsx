import React from "react";
//Styles
import styles from "@/shared/components/SectionHeadline.module.scss";

interface SectionHeadlineProps {
  text: string;
  icon?: React.ReactNode;
}

const SectionHeadline: React.FC<SectionHeadlineProps> = ({ text, icon }) => {
  return (
    <div className={styles.headline}>
      <i>{icon}</i>
      <h4>{text}</h4>
    </div>
  );
};

export default SectionHeadline;
