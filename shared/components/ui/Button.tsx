import React from "react";

//Styles
import styles from "./Button.module.scss";

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  type: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  iconPosition,
  variant,
  className,
  onClick,
  disabled,
  type,
}) => {
  return (
    <button
      className={`${styles.button} ${variant ? styles[variant] : ""} ${className}`}
      style={{
        flexDirection: iconPosition === "left" ? "row" : "row-reverse",
        gap: icon ? "0.5rem" : "0",
      }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className={styles.icon}>{icon}</span>
      {text}
    </button>
  );
};

export default Button;
